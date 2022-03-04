import { Contract } from "ethers";
import ContractAbstract from "./ContractAbstract";
export default class Perpetual extends ContractAbstract {
    constructor(props: any);
    getPerpetualContract(): Contract;
    getGasLimit(contract: Contract, method: string, args: any): Promise<string>;
    deposit(token: string, amount: string): Promise<any>;
    withdraw(token: string): Promise<any>;
    getWithdrawalBalance(token: string): Promise<string>;
}
