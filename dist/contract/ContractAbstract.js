"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
const ethers_1 = require("ethers");
var Contracts;
(function (Contracts) {
    Contracts["perpetualContract"] = "perpetualContract";
})(Contracts = exports.Contracts || (exports.Contracts = {}));
class ContractAbstract {
    constructor(props) {
        this.Contracts = Contracts;
        this.Abi = {};
        this.contract = props.contract;
    }
    setAddress(address) {
        this.address = address;
    }
    _getAddress(address) {
        return address || this.getContractAddress(this.name) || "";
    }
    getContractAddress(contractKey) {
        if (!this.contract.config[this.contract.chainId]) {
            return "";
        }
        return this.contract.config[this.contract.chainId][`${contractKey}Address`];
    }
    getContractProvider(address) {
        try {
            return new ethers_1.Contract(this._getAddress(address), this.Abi, this.contract.provider);
        }
        catch (error) {
            throw error;
        }
    }
    getContractSigner(address) {
        try {
            return new ethers_1.Contract(this._getAddress(address), this.Abi, this.contract.signer);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ContractAbstract;
