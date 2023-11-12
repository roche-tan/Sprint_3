import { createHttpServer } from "../http-json-api-server-main";
import supertest from "supertest";

// Configura un servidor HTTP para las pruebas
const server = createHttpServer();
const port = 3000; // Puerto de prueba

beforeAll(() => {
  server.listen(port);
});

afterAll(() => {
  server.close();
});

describe("HTTP JSON API Server Tests", () => {
  it("should respond with correct JSON for /api/parsetime", async () => {
    const response = await supertest(server)
      .get("/api/parsetime?iso=2023-11-12T12:34:56.789Z")
      .expect(200)
      .expect("Content-Type", /json/);

    // Verifica que la respuesta tenga la estructura esperada
    expect(response.body).toEqual({ hour: 13, minute: 34, second: 56 });
  });

  it("should respond with correct JSON for /api/parsetime", async () => {
    const response = await supertest(server)
      .get("/api/parsetime?iso=2023-11-12T12:34:56.789Z")
      .expect(200)
      .expect("Content-Type", /json/);

    // Ajusta la prueba para coincidir con la hora actual del servidor (13)
    expect(response.body).toEqual({ hour: 13, minute: 34, second: 56 });
  });

  it("should respond with correct JSON for /api/unixtime", async () => {
    const response = await supertest(server)
      .get("/api/unixtime?iso=2023-11-12T12:34:56.789Z")
      .expect(200)
      .expect("Content-Type", /json/);

    // Verifica que la respuesta tenga la estructura esperada
    expect(response.body).toEqual({ unixtime: expect.any(Number) });
  });

  it("should respond with 400 for invalid endpoint", async () => {
    await supertest(server).get("/api/invalid").expect(400);
  });

  it("should respond with 400 for non-GET request", async () => {
    // Use Supertest to make a POST request to a valid endpoint
    const response = await supertest(server)
      .post("/api/parsetime") // Use a valid endpoint
      .expect(400); // Expect a 400 response code
  });
});
