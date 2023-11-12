import { createFileServer } from "../http-file-server-main";
import * as http from "http";
import * as fs from "fs";
import * as stream from "stream";
import { AddressInfo } from "net";

jest.mock("fs");

describe("createFileServer", () => {
  let server: http.Server;
  const mockFile = "test.txt";
  const mockContent = "Hello, World!";

  beforeEach(() => {
    // Mock fs.createReadStream
    (fs.createReadStream as jest.Mock).mockImplementation(() => {
      const readable = new stream.Readable();
      readable.push(mockContent); // Mock file content
      readable.push(null); // Indicate the end of the stream
      return readable;
    });

    server = createFileServer(mockFile);
  });

  it("should create a server that responds with file content", (done) => {
    server.listen(0, () => {
      const { port } = server.address() as AddressInfo;

      http.get(`http://localhost:${port}`, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          expect(data).toBe(mockContent);
          server.close();
          done();
        });
      });
    });
  });
});
describe('HTTP File Server', () => {
  let server: http.Server;
  const mockFile = 'test.txt';
  const mockContent = 'Hello, World!';

  beforeAll(() => {
      // Mock fs.createReadStream
      (fs.createReadStream as jest.Mock).mockImplementation(() => {
          const readable = new stream.Readable();
          readable.push(mockContent);  // Mock file content
          readable.push(null);  // Indicate the end of the stream
          return readable;
      });
  });

  afterEach(() => {
      server.close(); // Ensure server is closed after each test
  });

  it('should respond with file content', done => {
      server = createFileServer(mockFile);
      server.listen(0, () => {
          const { port } = (server.address() as AddressInfo);

          http.get(`http://localhost:${port}`, res => {
              let data = '';

              res.on('data', chunk => {
                  data += chunk;
              });

              res.on('end', () => {
                  expect(data).toBe(mockContent);
                  done();
              });
          });
      });
  });
});