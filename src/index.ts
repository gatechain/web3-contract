import { Signer, providers } from "ethers"
import { ERC20 } from "./contract/ERC20";
import Perpetual from "./contract/Perpetual";
export * from './utils'

export interface Config {
	[key: number]: {
	  perpetualContract: {
		address: string
	  },
	  [key: string]: any,
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
	[key: string]: any

	constructor (props: any) {
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
	
	public registerContract (ContractClass: any): void {
		const attr = ContractClass.name
		if (this[attr]) {
			throw new Error(attr + ' already exists.')
		}
		this[attr] = new ContractClass({contract: this})
	}
	
	public sign (value: string) {
		return this.signer.signMessage(value)
	}
	
	public setAccount (account: string) {
		this.currAccount = account
		this.signer = (this.provider as any).getSigner(account)
	}

	public setChainId (chainId: number) {
		this.chainId = chainId
	}

	public setProvider (provider: providers.Provider) {
		this.provider = provider
		this.signer = (this.provider as any).getSigner(this.currAccount)
	}
}