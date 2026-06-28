const db = require("../config/db.js");
const usuarioModel = require("../models/usuarioModel.js");

jest.mock("../config/db.js");

describe("usuarioModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("buscarPorEmail", () => {
    it("deve retornar o usuario quando encontrado pelo email", async () => {
      const usuarioMock = {
        id: 1,
        nome: "João",
        email: "joao@email.com",
        senha: "$2a$10$hashFalso",
        telefone: "27999999999",
        foto: null,
        perfil: "ofertante",
      };

      db.execute.mockResolvedValue([[usuarioMock]]);

      const resultado = await usuarioModel.buscarPorEmail("joao@email.com");

      expect(db.execute).toHaveBeenCalledWith(
        "SELECT * FROM usuarios WHERE email = ?",
        ["joao@email.com"]
      );
      expect(resultado).toEqual(usuarioMock);
    });

    it("deve retornar undefined quando o email nao existe", async () => {
      db.execute.mockResolvedValue([[]]);

      const resultado = await usuarioModel.buscarPorEmail("naoexiste@email.com");

      expect(db.execute).toHaveBeenCalledWith(
        "SELECT * FROM usuarios WHERE email = ?",
        ["naoexiste@email.com"]
      );
      expect(resultado).toBeUndefined();
    });

    it("deve propagar erro do banco de dados", async () => {
      db.execute.mockRejectedValue(new Error("Erro de conexao"));

      await expect(
        usuarioModel.buscarPorEmail("joao@email.com")
      ).rejects.toThrow("Erro de conexao");
    });
  });

  describe("criarUsuario", () => {
    it("deve inserir usuario e retornar o insertId", async () => {
      db.execute.mockResolvedValue([{ insertId: 42 }]);

      const resultado = await usuarioModel.criarUsuario(
        "Maria",
        "maria@email.com",
        "senhaHash",
        "27988888888",
        "foto.jpg",
        "interessado"
      );

      expect(db.execute).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO usuarios"),
        ["Maria", "maria@email.com", "senhaHash", "27988888888", "foto.jpg", "interessado"]
      );
      expect(resultado).toBe(42);
    });

    it("deve funcionar com foto null", async () => {
      db.execute.mockResolvedValue([{ insertId: 5 }]);

      const resultado = await usuarioModel.criarUsuario(
        "Carlos",
        "carlos@email.com",
        "hashSenha",
        "27977777777",
        null,
        "administrador"
      );

      expect(db.execute).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO usuarios"),
        ["Carlos", "carlos@email.com", "hashSenha", "27977777777", null, "administrador"]
      );
      expect(resultado).toBe(5);
    });

    it("deve propagar erro do banco de dados ao criar usuario", async () => {
      db.execute.mockRejectedValue(new Error("Duplicate entry"));

      await expect(
        usuarioModel.criarUsuario("Ana", "ana@email.com", "hash", "27900000000", null, "ofertante")
      ).rejects.toThrow("Duplicate entry");
    });
  });
});
