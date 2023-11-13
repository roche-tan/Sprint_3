import { fetchData } from "../http-client-main";
import http from "http";

jest.mock("http", () => ({ //mock del modulo http
  get: jest.fn(), // replace get method with a jest mock function
}));

describe("HTTP GET Request", () => {
  it("should make an HTTP GET request and return data", async () => {
    const mockChunks = ["test ", "data"]; // mockup data chunks. simulates data received from an HTTP request
    const mockResponse = { //mock response object
      setEncoding: jest.fn(), 
      on: jest.fn((event, callback) => { //mock that simulates response events
        if (event === "data") {
          mockChunks.forEach((chunk) => callback(chunk)); //
        }
        if (event === "end") {
          callback();
        }
      }),
    };

    (http.get as jest.Mock).mockImplementation((url, callback) => { //sets mockup behaviout for hhtp.get. when calld it invokes the callback function with the mockResponse
      callback(mockResponse);
      return { on: jest.fn() };
    });

    const data = await fetchData("http://example.com"); //fetchData is called with a sample URL and test checks if returns the mock data
    expect(data).toEqual(mockChunks);
  });

  it("should handle response error event", async () => {
    const mockError = new Error("Test response error");
    const mockResponse = {
      setEncoding: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === "error") {
          callback(mockError);
        }
      }),
    };

    (http.get as jest.Mock).mockImplementation((url, callback) => {
      callback(mockResponse);
      return { on: jest.fn() };
    });

    await expect(fetchData("http://example.com")).rejects.toThrow(
      "Test response error"
    );
  });

  it("should handle network error event", async () => {
    const mockNetworkError = new Error("Test network error");

    (http.get as jest.Mock).mockImplementation(() => {
      const request = {
        on: jest.fn((event, callback) => {
          if (event === "error") {
            callback(mockNetworkError);
          }
        }),
      };
      return request;
    });

    await expect(fetchData("http://example.com")).rejects.toThrow(
      "Test network error"
    );
  });
});
