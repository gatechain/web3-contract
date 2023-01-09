import { Contract } from "ethers";
import { Web3Contract } from "../index";
export declare enum Contracts {
    perpetualContract = "perpetualContract"
}
declare abstract class ContractAbstract {
    static contractName?: string;
    contract: Web3Contract;
    Contracts: typeof Contracts;
    Abi: any;
    address?: string;
    name?: string;
    constructor(props: any);
    setAddress(address: string): void;
    private _getAddress;
    getContractAddress(contractKey: Contracts & any): any;
    getContractProvider(address?: string): Contract;
    getContractSigner(address?: string): Contract;
}
export default ContractAbstract;
