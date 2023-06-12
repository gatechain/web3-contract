import { Contract } from "../utils";
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
    private _contractName_;
    Abi: any;
    constructor(props: any);
    parseOption(opt?: IOption): [address: string | undefined, rest: Omit<IOption, "address">];
    private _getAddress;
    getContractAddress(contractKey?: any): any;
    getContractProvider(address?: string): Contract;
    getContractSigner(address?: string): Contract;
}
export default ContractAbstract;
