"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ContractAbstract {
    constructor(props) {
        this.Abi = {};
        this.contract = props.contract;
        this._contractName_ = props._contractName_;
    }
    parseOption(opt) {
        if (!opt) {
            return [undefined, {}];
        }
        const { address } = opt, rest = __rest(opt, ["address"]);
        return [address, rest];
    }
    _getAddress(address) {
        return address || this.getContractAddress(this._contractName_) || "";
    }
    getContractAddress(contractKey) {
        if (!this.contract.config[this.contract.chainId]) {
            return "";
        }
        return this.contract.config[this.contract.chainId][`${contractKey || this._contractName_}Address`];
    }
    getContractProvider(address) {
        try {
            return new utils_1.Contract(this._getAddress(address), this.Abi, this.contract.provider);
        }
        catch (error) {
            throw error;
        }
    }
    getContractSigner(address) {
        try {
            return new utils_1.Contract(this._getAddress(address), this.Abi, this.contract.signer);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ContractAbstract;
