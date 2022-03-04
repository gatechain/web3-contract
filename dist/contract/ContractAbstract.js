"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
var Contracts;
(function (Contracts) {
    Contracts["perpetualContract"] = "perpetualContract";
})(Contracts = exports.Contracts || (exports.Contracts = {}));
class ContractAbstract {
    constructor(props) {
        this.Contracts = Contracts;
        this.config = props.config;
        this.chainId = props.chainId;
        this.contract = props.contract;
    }
    getContractAddress(contractKey) {
        return this.config[this.chainId][contractKey].address;
    }
}
exports.default = ContractAbstract;
