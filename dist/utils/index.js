"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixdToDe = exports.intToFixed = exports.fixedToInt = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
// 乘以10的decimal次方
function fixedToInt(f, decimal) {
    f = fixdToDe(f, decimal);
    try {
        return (0, bignumber_1.parseFixed)(f + "", decimal).toString();
    }
    catch (_a) {
        return "";
    }
}
exports.fixedToInt = fixedToInt;
// 除以10的decimal次方
function intToFixed(i, decimal) {
    return (0, bignumber_1.formatFixed)(i, decimal).toString();
}
exports.intToFixed = intToFixed;
// 只是单纯获取小数位 decimal, 不够的补0
function fixdToDe(new_value, decimal) {
    var _a;
    if (!decimal || new_value === null)
        return "0";
    new_value = typeof new_value === "string" ? new_value : new_value.toString();
    const pointFrontLen = new_value.split(".")[0].length;
    const pointAfterLen = ((_a = new_value.split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    let endL = 1 + decimal;
    if (pointAfterLen - decimal < 0) {
        if (pointAfterLen === 0 && new_value.indexOf(".") < 0)
            new_value += ".";
        let len = decimal - pointAfterLen;
        for (let i = 0; i < len; i++) {
            new_value += "0";
        }
    }
    const fi_a = new_value.slice(0, pointFrontLen + endL);
    return fi_a;
}
exports.fixdToDe = fixdToDe;
