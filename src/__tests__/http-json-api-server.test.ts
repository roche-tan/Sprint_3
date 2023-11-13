import { createHttpServer } from "../http-json-api-server-main";
import supertest from "supertest";

// Configs HTTP server fot the tests
const server = createHttpServer();
const port = 3000; 

beforeAll(() => { //jest setup hook that runs before all tests. It starts the server on the specified port.
  server.listen(port);
});

afterAll(() => {//jest hook that runs after all tests have completed. It closes the server to clean up resources.
  server.close();
});

describe("HTTP JSON API Server Tests", () => {
  it("should respond with correct JSON for /api/parsetime", async () => { 
    const response = await supertest(server)//initializes Supertest with the server under test.
      .get("/api/parsetime?iso=2023-11-12T12:34:56.789Z") // sends a GET request to the server to the specified endpoint (/api/parsetime) with a query string containing an ISO-formatted date-time string.
      .expect(200)
      .expect("Content-Type", /json/); // header of the response to indicate a JSON format

    // Verifies response to have same estrucure
    expect(response.body).toEqual({ hour: 13, minute: 34, second: 56 });
  });

  it("should respond with correct JSON for /api/parsetime", async () => {
    const response = await supertest(server)
      .get("/api/parsetime?iso=2023-11-12T12:34:56.789Z")
      .expect(200)
      .expect("Content-Type", /json/);

    // Addjust the test Equal to actual time in server
    expect(response.body).toEqual({ hour: 13, minute: 34, second: 56 });
  });

  it("should respond with correct JSON for /api/unixtime", async () => {
    const response = await supertest(server)
      .get("/api/unixtime?iso=2023-11-12T12:34:56.789Z")
      .expect(200)
      .expect("Content-Type", /json/);

    // Verifies respone to have the same structure
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
