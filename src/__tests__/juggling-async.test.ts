import { fetchData } from "../juggling-async-main";
import http from "http";

jest.mock("http", () => ({
  get: jest.fn(),
}));

describe("fetchData", () => {
  beforeEach(() => {
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      const mockResponse = {
        on: jest.fn((event, handler) => {
          if (event === "data") {
            handler("some data"); // Simula recibir algunos datos
          }
          if (event === "end") {
            handler(); // Simula el final de la recepción de datos
          }
        }),
      };

      callback(mockResponse);
      return { on: jest.fn() }; // Manejar el evento de error
    });
  });

  it("should accumulate data from multiple URLs", async () => {
    const urls = ["http://example.com/1", "http://example.com/2"];
    const data = await fetchData(urls);
    expect(data).toEqual(["some data", "some data"]); // Ajustar según lo que esperes recibir
  });

  it("should handle errors in HTTP requests", async () => {
    (http.get as jest.Mock).mockImplementationOnce((url, callback) => {
      const mockRequest = {
        on: jest.fn((event, handler) => {
          if (event === "error") {
            handler(new Error("Network error"));
          }
        }),
      };
      return mockRequest;
    });

    const urls = ["http://example.com/1"];
    await expect(fetchData(urls)).rejects.toThrow("Network error");
  });
  it("should handle errors in HTTP response", async () => {
    (http.get as jest.Mock).mockImplementationOnce((url, callback) => {
      const mockResponse = {
        on: jest.fn((event, handler) => {
          if (event === "error") {
            handler(new Error("Response error")); // Simular un error en la respuesta HTTP
          }
        }),
      };

      callback(mockResponse);
      return { on: jest.fn() }; // Manejar el evento de error en la solicitud
    });

    const urls = ["http://example.com/1"];
    await expect(fetchData(urls)).rejects.toThrow("Response error");
  });
});
