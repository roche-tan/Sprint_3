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
jest.mock("./time-server-main", () => ({
  getFormatDate: jest.fn().mockReturnValue("2023-04-10 15:30"),
}));
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

describe("time-server", () => {
  let testServer: net.Server;
  let testPort: number = 0;

  beforeAll((done) => {
    // Inicializar el servidor en un puerto aleatorio
    testServer = server.listen(0, () => {
      const address = testServer.address() as net.AddressInfo;
      done();
    });
  });

  afterAll((done) => {
    // Cerrar el servidor después de las pruebas
    testServer.close(done);
  });

  it("should send formatted date and time and close the connection", (done) => {
    const client = net.createConnection({ port: testPort }, () => {
      let receivedData = "";

      client.on("data", (data) => {
        receivedData += data.toString();
      });

      client.on("end", () => {
        // Verificar que los datos recibidos coinciden con el mock de getFormatDate
        expect(receivedData).toBe("2023-04-10 15:30\n");
        done();
      });
    });

    client.on("error", (err) => {
      done(err);
    });
  });
});
