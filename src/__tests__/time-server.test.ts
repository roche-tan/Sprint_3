
import { getFormatDate } from "../time-server";


jest.mock("net", () => { //jest mock function. it is mocking net module
  return {
    createServer: jest.fn().mockReturnValue({ //createServer mock function. returns a mock object with listen property
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

