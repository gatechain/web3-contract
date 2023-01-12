import { Contract } from "ethers";
import { Web3Contract } from "../index";

export type BigNumber = any;
export interface IOption {
  gasLimit?: Number;
  from?: string;
  value?: string;
  address?: string;
}

abstract class ContractAbstract {
  // Registercontract use
  static contractName?: string;
  public contract: Web3Contract;

  public Abi: any = {};
  public name?: string;

  constructor(props: any) {
    this.contract = props.contract;
  }

  public parseOption(
    opt?: IOption
  ): [address: string | undefined, rest: Omit<IOption, "address">] {
    if (!opt) {
      return [undefined, {}];
    }
    const { address, ...rest } = opt;
    return [address, rest];
  }

  private _getAddress(address?: string) {
    return address || this.getContractAddress(this.name) || "";
  }

  public getContractAddress(contractKey: any) {
    if (!this.contract.config[this.contract.chainId]) {
      return "";
    }
    return this.contract.config[this.contract.chainId][`${contractKey}Address`];
  }

  public getContractProvider(address?: string) {
    try {
      return new Contract(
        this._getAddress(address),
        this.Abi,
        this.contract.provider
      );
    } catch (error) {
      throw error;
    }
  }

  public getContractSigner(address?: string) {
    try {
      return new Contract(
        this._getAddress(address),
        this.Abi,
        this.contract.signer
      );
    } catch (error) {
      throw error;
    }
  }
}

export default ContractAbstract;
