import { Contract } from "ethers";
import ContractAbstract from "./ContractAbstract";
interface IExit {
    balance: string;
    bjj: string;
    batchNum: number;
    merkleProof: {
        siblings: any[];
    };
    accountIndex: string | number;
}
export default class Perpetual extends ContractAbstract {
    constructor(props: any);
    getPerpetualContract(): Contract;
    getGasLimit(contract: Contract, method: string, args: any): Promise<string>;
    withdrawMerkleProof(exit: IExit): Promise<any>;
    deposit(token: string, amount: string): Promise<any>;
    getDepositToken(): any;
    withdraw(token: string): Promise<any>;
    getWithdrawalBalance(token: string): Promise<string>;
}
export {};
