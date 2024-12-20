import { CompanyRepository } from "../../domain/entities/company.ts";
import {
  Contract,
  ContractCreate,
  ContractRepository,
} from "../../domain/entities/contract.ts";
import { CompanyRepositoryPrisma } from "../../infrastructure/repositories/company.repository.ts";
import { ContractRepositoryPrisma } from "../../infrastructure/repositories/contract.repository.ts";

export class ContractCommands {
  private contractRepository: ContractRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.contractRepository = new ContractRepositoryPrisma();
    this.companyRepository = new CompanyRepositoryPrisma();
  }

  async create({
    code,
    title,
    withholding,
    companyCnpj,
  }: ContractCreate): Promise<Contract> {
    const company = await this.companyRepository.findByCnpj(companyCnpj);

    if (!company) {
      throw new Error("Empresa não localizada pelo CNPJ");
    }

    const doesExistContractWithThisTitle =
      await this.contractRepository.findContractByTitle(title);

    if (doesExistContractWithThisTitle) {
      throw new Error("Já existe um contrato com esse título");
    }

    const newContract = await this.contractRepository.create({
      code,
      title,
      withholding,
      companyCnpj,
    });

    return newContract;
  }

  async findAllContractsByCompany(companyCnpj: string) {
    const company = await this.companyRepository.findByCnpj(companyCnpj);

    if (!company) {
      throw new Error("Essa empresa não existe. Verifique o CNPJ");
    }

    const contracts =
      await this.contractRepository.findAllContracts(companyCnpj);

    if (!contracts) {
      throw new Error("Esta empresa ainda não possui contratos cadastrados");
    }

    return contracts;
  }

  async findContractById(id: string) {
    const contract = await this.contractRepository.findContractById(id);

    if (!contract) {
      throw new Error("O contrato procurado não existe");
    }

    return contract;
  }
}
