import net from "net";
import { getFormatDate } from "../time-server-main";
import { server } from "../time-server";

jest.mock("net", () => {
  return {
    createServer: jest.fn().mockReturnValue({
      listen: jest.fn(),
    }),
  };
});

describe("getFormatDate", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Use Jest's modern fake timers
    jest.setSystemTime(new Date(2023, 3, 10, 15, 30)); // Set a fixed date (April 10, 2023, 15:30)
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore real timers after the tests
  });

  it("should return the date in YYYY-MM-DD HH:mm format", () => {
    const result = getFormatDate();
    expect(result).toBe("2023-04-10 15:30");
  });
});

describe("Time Server", () => {
  let testServer: net.Server;
  let testPort = 0; // Use 0 for the operating system to assign an arbitrary available port

  // Start the server before all tests
  beforeAll((done) => {
    testServer = server.listen(testPort, () => {
      testPort = (testServer.address() as net.AddressInfo).port;
      done();
    });
  }, 10000); // Increase the timeout to 10 seconds

  // Close the server after all tests
  afterAll((done) => {
    if (testServer) {
      testServer.close(done);
    } else {
      done(); // If testServer is undefined, just call done
    }
  });

  // Test case
  it("should send the current date and time in YYYY-MM-DD HH:mm format", (done) => {
    // Connect to the server
    const client = net.createConnection({ port: testPort }, () => {
      client.on("data", (data) => {
        // Check if the data matches the expected format
        expect(data.toString()).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\n$/);
        client.end(); // Close the client connection
        done(); // Finish the test
      });
    });

    client.on("error", (err) => {
      done(err); // Handle connection errors
    });
  });
});
