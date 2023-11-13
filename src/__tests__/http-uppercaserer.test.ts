import { createUppercaseServer } from "../http-uppercaserer-main";
import * as http from "http";
import { AddressInfo } from "net";

describe("HTTP Uppercase Server", () => {
  let server: http.Server;

  beforeAll(() => { //jest setup hook that runs before all tests. It starts the server on the specified port.
    server = createUppercaseServer();
    server.listen(0); // Listen on a random available port
  });

  afterAll(() => { //jest hook that runs after all tests have completed. It closes the server to clean up resources.
    server.close(); // Close the server after tests
  });

  it("should convert POST request body to uppercase", (done) => {
    const { port } = server.address() as AddressInfo; //server.address() returns an object containing the address information of the server

    const postData = "Hello, World!";
    const options = { //Object that contains configuration options for the request
      hostname: "localhost",
      port,
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": Buffer.byteLength(postData), //is setting a header in the HTTP request options
      },
    };

    const req = http.request(options, (res) => { //This sends an HTTP request. The callback function is executed when a response is received.
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

    req.write(postData); //This sends the postData in the body of the request.
    req.end(); //This ends the request. 
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
