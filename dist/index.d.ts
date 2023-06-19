import { Signer, providers } from "ethers";
import { ERC20 } from "./contract/ERC20";
import Perpetual from "./contract/Perpetual";
export * from "./utils";
export interface Config {
    [key: number]: {
        perpetualContract: {
            address: string;
        };
        [key: string]: any;
    };
    GateWalletConfig?: {
        METAMASK_MESSAGE?: string;
        EIP_712_PROVIDER?: string;
        EIP_712_VERSION?: string;
        CONTRACT_ADDRESSES?: {
            GateChain: string;
            WithdrawalDelayer: string;
        };
        CREATE_ACCOUNT_AUTH_MESSAG?: string;
    };
}
export declare class HipoContract {
    provider: providers.Provider;
    currAccount: string;
    signer: Signer;
    perpetual: Perpetual;
    ERC20: ERC20;
    config: Config;
    chainId: number;
    private gateWallet?;
    private gateAddress?;
    [key: string]: any;
    constructor(props: any);
    registerContract(ContractClass: any): void;
    sign(value: string): Promise<string>;
    setAccount(account: string): void;
    setChainId(chainId: number): void;
    setProvider(provider: providers.Provider): void;
    createWalletFromGateChainAccount(privateKeyHex?: string | null): Promise<{
        gateWallet: any;
        gateAddress: string;
    }>;
    getGateWallet(): any;
    getGateAddress(): string | undefined;
    signCreateAccountAuthorization(): any;
}
