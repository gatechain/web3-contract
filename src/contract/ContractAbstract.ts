import { Config, HipoContract } from "../index"

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
		return this.contract.config[this.contract.chainId][contractKey].address
	}
	
}

export default ContractAbstract