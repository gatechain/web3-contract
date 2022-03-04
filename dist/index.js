"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HipoContract = void 0;
const ERC20_1 = require("./contract/ERC20");
const Perpetual_1 = __importDefault(require("./contract/Perpetual"));
class HipoContract {
    constructor(props) {
        const resultPorps = Object.assign(Object.assign({}, props), { contract: this });
        this.currAccount = props.currAccount;
        this.provider = props.provider;
        this.signer = props.provider.getSigner();
        this.perpetual = new Perpetual_1.default(resultPorps);
        this.ERC20 = new ERC20_1.ERC20(resultPorps);
        this.config = props.config;
    }
    sign(value) {
        return this.signer.signMessage(value);
    }
    setAccount(account) {
        this.currAccount = account;
    }
    setProvider(provider) {
        this.provider = provider;
        this.signer = provider.getSigner();
    }
}
exports.HipoContract = HipoContract;
