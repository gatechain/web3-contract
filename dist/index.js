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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HipoContract = void 0;
const ERC20_1 = require("./contract/ERC20");
const Perpetual_1 = __importDefault(require("./contract/Perpetual"));
__exportStar(require("./utils"), exports);
const gatewallet_1 = __importDefault(require("gatewallet"));
class HipoContract {
    constructor(props) {
        const resultPorps = {
            contract: this,
        };
        this.currAccount = props.currAccount;
        this.provider = props.provider;
        this.config = props.config;
        this.chainId = props.chainId;
        this.signer = props.provider.getSigner(props.currAccount);
        this.ERC20 = new ERC20_1.ERC20(resultPorps);
        this.perpetual = new Perpetual_1.default(resultPorps);
    }
    registerContract(ContractClass) {
        const attr = ContractClass.contractName;
        if (this[attr]) {
            console.warn(attr + " already exists.");
            return;
        }
        this[attr] = new ContractClass({ contract: this });
        this[attr].name = attr;
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
    createWalletFromGateChainAccount(privateKeyHex) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { gateWallet, gateAddress } = yield gatewallet_1.default.createWalletFromGateChainAccount(this.signer, (_a = this === null || this === void 0 ? void 0 : this.config[this.chainId]) === null || _a === void 0 ? void 0 : _a.GateWalletConfig, privateKeyHex || null);
            this.gateWallet = gateWallet;
            this.gateAddress = gateAddress;
            return { gateWallet, gateAddress };
        });
    }
    getGateWallet() {
        if (this.gateWallet) {
            return this.gateWallet;
        }
    }
    getGateAddress() {
        if (this.gateAddress) {
            return this.gateAddress;
        }
    }
    signCreateAccountAuthorization() {
        if (!this.gateWallet) {
            throw new Error("Please use hipocontract in advance Createwalletfrometheraccount initialize gatewallet.");
        }
        return this.gateWallet.signCreateAccountAuthorization(this.provider, this.signer);
    }
}
exports.HipoContract = HipoContract;
