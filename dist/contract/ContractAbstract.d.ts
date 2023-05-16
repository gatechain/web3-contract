import { Contract } from "ethers";
import { Web3Contract } from "../index";
export type BigNumber = any;
export interface IOption {
    gasLimit?: Number;
    from?: string;
    value?: string;
    address?: string;
}
declare abstract class ContractAbstract {
    static contractName?: string;
    contract: Web3Contract;
    Abi: any;
    name?: string;
    constructor(props: any);
    parseOption(opt?: IOption): [address: string | undefined, rest: Omit<IOption, "address">];
    private _getAddress;
    getContractAddress(contractKey: any): any;
    getContractProvider(address?: string): Contract;
    getContractSigner(address?: string): Contract;
}
export default ContractAbstract;
