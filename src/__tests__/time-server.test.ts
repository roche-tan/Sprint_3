
import { getFormatDate } from "../time-server";


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

