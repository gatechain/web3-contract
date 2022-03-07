import { HipoContract } from "../index"

export enum Contracts {
	perpetualContract = 'perpetualContract'
}

abstract class ContractAbstract {
	public contract: HipoContract
	
	public Contracts = Contracts

	constructor(props: any) {
		this.contract = props.contract
	}

	public getContractAddress (contractKey: Contracts) {
		if (!this.contract.config[this.contract.chainId]) {
			return ''
		}
		return this.contract.config[this.contract.chainId][`${contractKey}Address`]
	}
}

export default ContractAbstract