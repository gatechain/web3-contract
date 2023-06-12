import { utils } from "ethers";
export * from "ethers";

// 乘以10的decimal次方
export function fixedToInt(f: string | number, decimal: number): string {
  return utils.parseUnits(f.toString(), decimal).toString();
}

// 除以10的decimal次方;
export function intToFixed(i: string | number, decimal: number): string {
  return utils.formatUnits(i.toString(), decimal);
}
