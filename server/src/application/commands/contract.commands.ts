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
    companyId,
  }: ContractCreate): Promise<Contract> {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new Error("Empresa não localizada pelo CNPJ");
    }

    const doesExistContractWithThisTitle =
      await this.contractRepository.findContractByTitle(title, companyId);

    if (doesExistContractWithThisTitle) {
      throw new Error("Já existe um contrato com esse título");
    }

    const newContract = await this.contractRepository.create({
      code,
      title,
      withholding,
      companyId,
    });

    return newContract;
  }

  async findAllContractsByCompany(companyId: string) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new Error(
        "Essa empresa não existe. Pode haver algum erro com o ID. Essa é uma busca pelo ID da empresa, não CNPJ",
      );
    }

    const contracts = await this.contractRepository.findAllContracts(companyId);

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
