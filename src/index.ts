import { providers, VoidSigner } from "ethers";
export * from "./utils";

export interface Config {
  [key: number]: {
    [key: string]: any;
  };
}

export class Web3Contract {
  public provider: providers.Provider;
  public currAccount: string;
  public signer: VoidSigner;
  public config: Config;
  public chainId: number;

  [key: string]: any;

  constructor(props: any) {
    this.currAccount = props.currAccount;
    this.provider = props.provider;
    this.config = props.config;
    this.chainId = props.chainId;
    this.signer = props.provider.getSigner(props.currAccount);
  }

  public registerContract(ContractClass: any): void {
    const attr = ContractClass.contractName;
    if (this[attr]) {
      console.warn(attr + " already exists.");
      return;
    }
    this[attr] = new ContractClass({ contract: this });
    this[attr].name = attr;
  }

  public sign(value: string) {
    return this.signer.signMessage(value);
  }

  public setAccount(account: string) {
    this.currAccount = account;
    this.signer = (this.provider as any).getSigner(account);
  }

  public setChainId(chainId: number) {
    this.chainId = chainId;
  }

  public setProvider(provider: providers.Provider) {
    this.provider = provider;
    this.signer = (this.provider as any).getSigner(this.currAccount);
  }
}
