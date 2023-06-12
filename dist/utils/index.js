"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intToFixed = exports.fixedToInt = void 0;
const ethers_1 = require("ethers");
__exportStar(require("ethers"), exports);
// 乘以10的decimal次方
function fixedToInt(f, decimal) {
    return ethers_1.utils.parseUnits(f.toString(), decimal).toString();
}
exports.fixedToInt = fixedToInt;
// 除以10的decimal次方;
function intToFixed(i, decimal) {
    return ethers_1.utils.formatUnits(i.toString(), decimal);
}
exports.intToFixed = intToFixed;
