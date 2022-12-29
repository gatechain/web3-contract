import { parseFixed, formatFixed } from "@ethersproject/bignumber";

// 乘以10的decimal次方
export function fixedToInt(f: string | number, decimal: number): string {
  f = fixdToDe(f, decimal);
  try {
    return parseFixed(f + "", decimal).toString();
  } catch {
    return "";
  }
}

// 除以10的decimal次方
export function intToFixed(i: string | number, decimal: number): string {
  return formatFixed(i, decimal).toString();
}

// 只是单纯获取小数位 decimal, 不够的补0
export function fixdToDe(new_value: string | number, decimal: number): string {
  if (!decimal || new_value === null) return "0";
  new_value = typeof new_value === "string" ? new_value : new_value.toString();
  const pointFrontLen = new_value.split(".")[0].length;
  const pointAfterLen = new_value.split(".")[1]?.length || 0;
  let endL = 1 + decimal;
  if (pointAfterLen - decimal < 0) {
    if (pointAfterLen === 0 && new_value.indexOf(".") < 0) new_value += ".";
    let len = decimal - pointAfterLen;
    for (let i = 0; i < len; i++) {
      new_value += "0";
    }
  }
  const fi_a = new_value.slice(0, pointFrontLen + endL);
  return fi_a;
}
