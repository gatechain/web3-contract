import { Contract } from "ethers"
import { HipoContract } from "../index"

export enum Contracts {
  perpetualContract = 'perpetualContract'
}

abstract class ContractAbstract {
  // Registercontract use 
  static contractName?: string
  public contract: HipoContract

  public Contracts = Contracts
  public Abi: any = {}
  public address?: string
  public name?: string

  constructor(props: any) {
    this.contract = props.contract
  }

  public setAddress(address: string) {
    this.address = address
  }

  private _getAddress(address?: string) {
    return address || this.getContractAddress(this.name) || ''
  }

  public getContractAddress(contractKey: Contracts & any) {
    if (!this.contract.config[this.contract.chainId]) {
      return ''
    }
    return this.contract.config[this.contract.chainId][`${contractKey}Address`]
  }

  public getContractProvider(address?: string) {
    try {
      return new Contract(this._getAddress(address), this.Abi, this.contract.provider)
    } catch (error) {
      throw error
    }
  }

  public getContractSigner(address?: string) {
    try {
      return new Contract(this._getAddress(address), this.Abi, this.contract.signer)
    } catch (error) {
      throw error
    }
  }
}

export default ContractAbstract
