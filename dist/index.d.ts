import { Signer, providers } from "ethers";
import { ERC20 } from "./contract/ERC20";
import Perpetual from "./contract/Perpetual";
export interface Config {
    [key: number]: {
        perpetualContract: {
            address: string;
        };
        [key: string]: any;
    };
}
export declare class HipoContract {
    provider: providers.Provider;
    currAccount: string;
    signer: Signer;
    perpetual: Perpetual;
    ERC20: ERC20;
    config: Config;
    constructor(props: any);
    sign(value: string): Promise<string>;
    setAccount(account: string): void;
    setProvider(provider: providers.Provider): void;
}
