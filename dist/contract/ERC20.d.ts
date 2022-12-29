import { BigNumber } from "@ethersproject/bignumber";
import { Signer, providers, Contract } from "ethers";
import ContractAbstract from "./ContractAbstract";
declare enum ApproveStatus {
    Approve = 0,
    dontApprove = 1
}
export declare function getERC20Contract(token: string, signerOrProvider?: Signer | providers.Provider): Contract;
export declare class ERC20 extends ContractAbstract {
    constructor(props: any);
    getERC20Contract: typeof getERC20Contract;
    getBalanceOf(token: string): Promise<[string, BigNumber]>;
    getTokenAllowance(token: string, spender: string): Promise<BigNumber>;
    approve(token: string, spender: string, value: string): Promise<any>;
    /**
     * 查看授权状态
     */
    getApproveStatus(token: string, spender: string, value: string): Promise<ApproveStatus>;
}
export default ContractAbstract;
