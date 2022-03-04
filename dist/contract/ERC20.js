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
exports.ERC20 = exports.getERC20Contract = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const utils_1 = require("../utils");
const ERC20_1 = __importDefault(require("./abis/ERC20"));
const ContractAbstract_1 = __importDefault(require("./ContractAbstract"));
var ApproveStatus;
(function (ApproveStatus) {
    ApproveStatus[ApproveStatus["Approve"] = 0] = "Approve";
    ApproveStatus[ApproveStatus["dontApprove"] = 1] = "dontApprove";
})(ApproveStatus || (ApproveStatus = {}));
function getERC20Contract(token, signerOrProvider) {
    return new ethers_1.Contract(token, ERC20_1.default, signerOrProvider);
}
exports.getERC20Contract = getERC20Contract;
function getERC20(token, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = getERC20Contract(token, provider);
        const decimals = yield contract.decimals();
        return { decimals, contract };
    });
}
class ERC20 extends ContractAbstract_1.default {
    constructor(props) {
        super(props);
        this.getERC20Contract = getERC20Contract;
    }
    getContractAddress(contractKey) {
        return this.config[this.chainId][contractKey].address;
    }
    // 查授权额度 
    getTokenAllowance(token, spender) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = getERC20Contract(token, this.contract.provider);
            const allowance = yield contract.allowance(this.contract.currAccount, spender);
            return allowance;
        });
    }
    // 授权
    approve(token, spender, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { decimals, contract } = yield getERC20(token, this.contract.provider);
                if (this.contract.signer) {
                    const signerContract = contract.connect(this.contract.signer);
                    const tx = yield signerContract.approve(spender, (0, utils_1.fixedToInt)(value, decimals));
                    return tx;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * 查看授权状态
     */
    getApproveStatus(token, spender, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allowance = yield this.getTokenAllowance(token, spender);
                const { decimals } = yield getERC20(token, this.contract.provider);
                const bigValue = bignumber_1.BigNumber.from((0, utils_1.fixedToInt)(value, decimals));
                return allowance.gte(bigValue) ? ApproveStatus.dontApprove : ApproveStatus.Approve;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ERC20 = ERC20;
exports.default = ContractAbstract_1.default;
