import { Signer, providers } from "ethers"
import { ERC20 } from "./contract/ERC20";
import Perpetual from "./contract/Perpetual";

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

	constructor (props: any) {
		const resultPorps = {
			contract: this
		}
		this.currAccount = props.currAccount
		this.provider = props.provider
		this.config = props.config
		this.chainId = props.chainId
		this.signer = props.provider.getSigner()
		
		this.ERC20 = new ERC20(resultPorps)
		this.perpetual = new Perpetual(resultPorps)
	}
	
	public sign (value: string) {
		return this.signer.signMessage(value)
	}
	
	public setAccount (account: string) {
		this.currAccount = account
		this.signer = (this.provider as any).getSigner()
	}

	public setChainId (chainId: number) {
		this.chainId = chainId
	}

	public setProvider (provider: providers.Provider) {
		this.provider = provider
		this.signer = (this.provider as any).getSigner()
	}
}