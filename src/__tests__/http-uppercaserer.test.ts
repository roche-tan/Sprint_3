import { createUppercaseServer } from "../http-uppercaserer-main";
import * as http from "http";
import { AddressInfo } from "net";

describe("HTTP Uppercase Server", () => {
  let server: http.Server;

  beforeAll(() => {
    server = createUppercaseServer();
    server.listen(0); // Listen on a random available port
  });

  afterAll(() => {
    server.close(); // Close the server after tests
  });

  it("should convert POST request body to uppercase", (done) => {
    const { port } = server.address() as AddressInfo;

    const postData = "Hello, World!";
    const options = {
      hostname: "localhost",
      port,
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toBe(200);
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        expect(data).toBe(postData.toUpperCase());
        done();
      });
    });

    req.write(postData);
    req.end();
  });

  it("should respond with 405 for non-POST methods", (done) => {
    const { port } = server.address() as AddressInfo;

    const options = {
      hostname: "localhost",
      port,
      path: "/",
      method: "GET", // Using GET method to test
    };

    http.get(options, (res) => {
      expect(res.statusCode).toBe(405);
      done();
    });
  });
});
