import { providers, VoidSigner } from "ethers";
export * from "./utils";
export interface Config {
    [key: number]: {
        [key: string]: any;
    };
}
export declare class Web3Contract {
    provider: providers.Provider;
    currAccount: string;
    signer: VoidSigner;
    config: Config;
    chainId: number;
    [key: string]: any;
    constructor(props: any);
    registerContract(ContractClass: any): void;
    sign(value: string): Promise<string>;
    setAccount(account: string): void;
    setChainId(chainId: number): void;
    setProvider(provider: providers.Provider): void;
}
