import { fixedToInt, intToFixed } from "../../src/utils";

describe("utils", () => {
  test("fixedToInt 8 * 10**18 = 8000000000000000000", () => {
    const r = fixedToInt(8, 18);
    expect(r).toBe("8000000000000000000");
  });
  test("fixedToInt 0.0002 * 10**18 = 2", () => {
    const r = fixedToInt(0.0002, 4);
    expect(r).toBe("2");
  });
  test("intToFixed 8 / 10**18 = 8.0", () => {
    const bigIntStr = "8000000000000000000";
    const r = intToFixed(bigIntStr, 18);
    expect(r).toBe("8.0");
  });
});
