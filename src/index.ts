import { Signer, providers } from "ethers"
import { ERC20 } from "./contract/ERC20";
import Perpetual from "./contract/Perpetual";
export * from './utils'
import gatewallet from 'gatewallet'
export interface Config {
  [key: number]: {
    perpetualContract: {
      address: string
    },
    [key: string]: any,
  }
  GateWalletConfig?: {
    METAMASK_MESSAGE?: string
    EIP_712_PROVIDER?: string
    EIP_712_VERSION?: string
    CONTRACT_ADDRESSES?: {
      GateChain: string,
      WithdrawalDelayer: string
    }
    CREATE_ACCOUNT_AUTH_MESSAG?: string
  }
}

export class HipoContract {
  public provider: providers.Provider
  public currAccount: string
  public signer: Signer
  public perpetual: Perpetual
  public ERC20: ERC20
  public config: Config
  public chainId: number
  private gateWallet?: any
  private gateAddress?: string

  [key: string]: any

  constructor(props: any) {
    const resultPorps = {
      contract: this
    }
    this.currAccount = props.currAccount
    this.provider = props.provider
    this.config = props.config
    this.chainId = props.chainId
    this.signer = props.provider.getSigner(props.currAccount)

    this.ERC20 = new ERC20(resultPorps)
    this.perpetual = new Perpetual(resultPorps)
  }

  public registerContract(ContractClass: any): void {
    const attr = ContractClass.contractName
    if (this[attr]) {
      console.warn(attr + ' already exists.')
      return
    }
    this[attr] = new ContractClass({ contract: this })
    this[attr].name = attr
  }

  public sign(value: string) {
    return this.signer.signMessage(value)
  }

  public setAccount(account: string) {
    this.currAccount = account
    this.signer = (this.provider as any).getSigner(account)
  }

  public setChainId(chainId: number) {
    this.chainId = chainId
  }

  public setProvider(provider: providers.Provider) {
    this.provider = provider
    this.signer = (this.provider as any).getSigner(this.currAccount)
  }

  public async createWalletFromGateChainAccount(privateKeyHex?: string | null): Promise<{ gateWallet: any, gateAddress: string }> {
    const { gateWallet, gateAddress } = await gatewallet.createWalletFromGateChainAccount(this.signer, this?.config[this.chainId]?.GateWalletConfig, privateKeyHex || null)
    this.gateWallet = gateWallet
    this.gateAddress = gateAddress
    return { gateWallet, gateAddress }
  }

  public getGateWallet() {
    if (this.gateWallet) {
      return this.gateWallet
    }
  }

  public getGateAddress() {
    if (this.gateAddress) {
      return this.gateAddress
    }
  }

  public signCreateAccountAuthorization() {
    if (!this.gateWallet) {
      throw new Error('Please use hipocontract in advance Createwalletfrometheraccount initialize gatewallet.')
    }

    return this.gateWallet.signCreateAccountAuthorization(this.provider, this.signer)
  }
}
