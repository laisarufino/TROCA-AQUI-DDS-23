const express = require("express");

jest.mock("../controllers/usuarioController.js", () => ({
  login: jest.fn((req, res) => res.json({ ok: true })),
  logout: jest.fn((req, res) => res.json({ ok: true })),
}));

const request = require("supertest");

function criarApp() {
  const app = express();
  app.use(express.json());
  const usuarioRoutes = require("../routes/usuarioRoutes.js");
  app.use("/usuarios", usuarioRoutes);
  return app;
}

describe("usuarioRoutes", () => {
  let app;

  beforeAll(() => {
    app = criarApp();
  });

  it("POST /usuarios/login deve chamar o controller de login", async () => {
    const res = await request(app)
      .post("/usuarios/login")
      .send({ email: "test@test.com", senha: "123" });

    expect(res.status).toBe(200);
  });

  it("GET /usuarios/logout deve chamar o controller de logout", async () => {
    const res = await request(app).get("/usuarios/logout");

    expect(res.status).toBe(200);
  });

  it("GET /usuarios/ deve retornar lista de usuarios", async () => {
    const res = await request(app).get("/usuarios/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensagem: "Peguei a lista de usuários" });
  });

  it("GET /usuarios/cadastro deve retornar pagina de cadastro", async () => {
    const res = await request(app).get("/usuarios/cadastro");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensagem: "Estou na página de cadastro" });
  });
});
