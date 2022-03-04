import { Config, HipoContract } from "../index";
export declare enum Contracts {
    perpetualContract = "perpetualContract"
}
declare abstract class ContractAbstract {
    chainId: any;
    config: Config;
    contract: HipoContract;
    Contracts: typeof Contracts;
    constructor(props: any);
    getContractAddress(contractKey: Contracts): string;
}
export default ContractAbstract;
