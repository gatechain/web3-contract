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
exports.Web3Contract = void 0;
__exportStar(require("./utils"), exports);
class Web3Contract {
    constructor(props) {
        this.currAccount = props.currAccount;
        this.provider = props.provider;
        this.config = props.config;
        this.chainId = props.chainId;
        this.signer = props.provider.getSigner(props.currAccount);
    }
    registerContract(ContractClass) {
        const attr = ContractClass.contractName;
        if (this[attr]) {
            console.warn(attr + " already exists.");
            return;
        }
        this[attr] = new ContractClass({ contract: this, _contractName_: attr });
    }
    sign(value) {
        return this.signer.signMessage(value);
    }
    setAccount(account) {
        this.currAccount = account;
        this.signer = this.provider.getSigner(account);
    }
    setChainId(chainId) {
        this.chainId = chainId;
    }
    setProvider(provider) {
        this.provider = provider;
        this.signer = this.provider.getSigner(this.currAccount);
    }
}
exports.Web3Contract = Web3Contract;
