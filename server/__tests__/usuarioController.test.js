const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel.js");

jest.mock("../models/usuarioModel.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const usuarioController = require("../controllers/usuarioController.js");

describe("usuarioController", () => {
  let req, res;

  beforeEach(() => {
    process.env.JWT_SECRET = "segredo-teste";

    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      render: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("deve retornar erro 404 quando usuario nao existe", async () => {
      req.body = { email: "naoexiste@email.com", senha: "123" };
      usuarioModel.buscarPorEmail.mockResolvedValue(undefined);

      await usuarioController.login(req, res);

      expect(usuarioModel.buscarPorEmail).toHaveBeenCalledWith("naoexiste@email.com");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.render).toHaveBeenCalledWith("erro", { mensagem: "Credenciais inválidas" });
    });

    it("deve retornar erro 404 quando a senha e invalida", async () => {
      req.body = { email: "joao@email.com", senha: "senhaErrada" };
      usuarioModel.buscarPorEmail.mockResolvedValue({
        id: 1,
        nome: "João",
        email: "joao@email.com",
        senha: "$2a$10$hashFalso",
        perfil: "ofertante",
      });
      bcrypt.compare.mockResolvedValue(false);

      await usuarioController.login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith("senhaErrada", "$2a$10$hashFalso");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.render).toHaveBeenCalledWith("erro", { mensagem: "Credenciais inválidas" });
    });

    it("deve redirecionar administrador para /usuarios", async () => {
      req.body = { email: "admin@email.com", senha: "senhaCorreta" };
      usuarioModel.buscarPorEmail.mockResolvedValue({
        id: 1,
        nome: "Admin",
        email: "admin@email.com",
        senha: "$2a$10$hashReal",
        perfil: "administrador",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token-fake");

      await usuarioController.login(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1, perfil: "administrador", nome: "Admin" },
        "segredo-teste",
        { expiresIn: "2h" }
      );
      expect(res.cookie).toHaveBeenCalledWith("token", "token-fake", { httpOnly: true });
      expect(res.redirect).toHaveBeenCalledWith("/usuarios");
    });

    it("deve redirecionar ofertante para /produtos/meus-produtos", async () => {
      req.body = { email: "ofertante@email.com", senha: "senha" };
      usuarioModel.buscarPorEmail.mockResolvedValue({
        id: 2,
        nome: "Ofertante",
        email: "ofertante@email.com",
        senha: "$2a$10$hash",
        perfil: "ofertante",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token-ofertante");

      await usuarioController.login(req, res);

      expect(res.cookie).toHaveBeenCalledWith("token", "token-ofertante", { httpOnly: true });
      expect(res.redirect).toHaveBeenCalledWith("/produtos/meus-produtos");
    });

    it("deve redirecionar interessado para /produtos/vitrine", async () => {
      req.body = { email: "interessado@email.com", senha: "senha" };
      usuarioModel.buscarPorEmail.mockResolvedValue({
        id: 3,
        nome: "Interessado",
        email: "interessado@email.com",
        senha: "$2a$10$hash",
        perfil: "interessado",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token-interessado");

      await usuarioController.login(req, res);

      expect(res.cookie).toHaveBeenCalledWith("token", "token-interessado", { httpOnly: true });
      expect(res.redirect).toHaveBeenCalledWith("/produtos/vitrine");
    });

    it("nao deve redirecionar quando perfil e desconhecido", async () => {
      req.body = { email: "outro@email.com", senha: "senha" };
      usuarioModel.buscarPorEmail.mockResolvedValue({
        id: 4,
        nome: "Outro",
        email: "outro@email.com",
        senha: "$2a$10$hash",
        perfil: "desconhecido",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token-outro");

      await usuarioController.login(req, res);

      expect(res.cookie).toHaveBeenCalledWith("token", "token-outro", { httpOnly: true });
      expect(res.redirect).not.toHaveBeenCalled();
    });

    it("deve retornar erro 500 quando ocorre excecao interna", async () => {
      req.body = { email: "joao@email.com", senha: "senha" };
      usuarioModel.buscarPorEmail.mockRejectedValue(new Error("DB down"));

      await usuarioController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.render).toHaveBeenCalledWith("erro", { mensagem: "Erro interno no servidor" });
    });
  });

  describe("logout", () => {
    it("deve limpar o cookie e redirecionar para /login", () => {
      usuarioController.logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("token");
      expect(res.redirect).toHaveBeenCalledWith("/login");
    });
  });
});
