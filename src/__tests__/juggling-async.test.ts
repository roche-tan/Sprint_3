import { fetchData } from "../juggling-async-main";
import http from "http";

jest.mock("http", () => ({
  get: jest.fn(),
}));

describe("fetchData", () => {
  beforeEach(() => {
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      //mockImplementation jest method that is used to define a personalized implmentation to a mock function
      const mockResponse = {
        on: jest.fn((event, handler) => {
          if (event === "data") {
            handler("some data"); // Simulates receiving some data
          }
          if (event === "end") {
            handler(); // Simulates the end of the data reception
          }
        }),
      };

      callback(mockResponse);
      return { on: jest.fn() }; // Returnting an object with property on. its value is a jest mock function
    });
  });

  it("should accumulate data from multiple URLs", async () => {
    const urls = ["http://example.com/1", "http://example.com/2"];
    const data = await fetchData(urls);
    expect(data).toEqual(["some data", "some data"]);
  });

  it("should handle errors in HTTP requests", async () => {
    const mockNetworkError = new Error("Test network error");
    (http.get as jest.Mock).mockImplementationOnce(() => {
      const mockRequest = {
        on: jest.fn((event, callback) => {
          if (event === "error") {
            callback(mockNetworkError);
          }
        }),
      };
      return mockRequest;
    });

    const urls = ["http://example.com/1"];
    await expect(fetchData(urls)).rejects.toThrow("Test network error");
  });

  it("should handle errors in HTTP response", async () => {
    (http.get as jest.Mock).mockImplementationOnce((url, callback) => {
      const mockResponse = {
        on: jest.fn((event, handler) => {
          if (event === "error") {
            handler(new Error("Response error")); // Simulate an error as a response to HTTP
          }
        }),
      };

      callback(mockResponse);
      return { on: jest.fn() };
    });

    const urls = ["http://example.com/1"];
    await expect(fetchData(urls)).rejects.toThrow("Response error");
  });
});
