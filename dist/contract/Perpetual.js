"use strict";
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
const ethers_1 = require("ethers");
const Perpetual_1 = __importDefault(require("./abis/Perpetual"));
const utils_1 = require("../utils");
const ContractAbstract_1 = __importDefault(require("./ContractAbstract"));
class Perpetual extends ContractAbstract_1.default {
    constructor(props) {
        super(props);
    }
    //充值合约
    getPerpetualContract() {
        try {
            return new ethers_1.Contract(this.getContractAddress(this.Contracts.perpetualContract), Perpetual_1.default, this.contract.signer);
        }
        catch (error) {
            throw error;
        }
    }
    getGasLimit(contract, method, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = { from: this.contract.currAccount };
                const gasLimit = yield contract.estimateGas[method](...args, options);
                return gasLimit.toString();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 新版提现
    withdrawMerkleProof(exit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = this.getPerpetualContract();
                console.log(exit, 'exit');
                const a = yield contract.withdrawMerkleProof(exit.balance, exit.bjj, exit.batchNum, exit.merkleProof.siblings, exit.accountIndex);
                return a;
            }
            catch (error) {
                console.log(error, 'error');
                throw error;
            }
        });
    }
    // 充值
    deposit(token, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = this.getPerpetualContract();
                const erc20 = this.contract.ERC20.getERC20Contract(token, this.contract.provider);
                const decimals = yield erc20.decimals();
                const amountBig = (0, utils_1.fixedToInt)(amount, decimals);
                return yield contract.deposit(this.contract.currAccount, amountBig);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 获取token address
    getDepositToken() {
        try {
            const contract = this.getPerpetualContract();
            return contract.getDepositToken();
        }
        catch (error) {
            throw error;
        }
    }
    // 提现
    withdraw(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = this.getPerpetualContract();
                return yield contract.withdraw(this.contract.currAccount, token);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 获取可提现余额
    getWithdrawalBalance(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = this.getPerpetualContract();
                const erc20 = this.contract.ERC20.getERC20Contract(token, this.contract.provider);
                const decimals = yield erc20.decimals();
                const balanceBig = yield contract.getWithdrawalBalance(this.contract.currAccount, token);
                return (0, utils_1.intToFixed)(balanceBig, decimals);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Perpetual;
