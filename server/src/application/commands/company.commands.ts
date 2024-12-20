import {
  Company,
  CompanyCreate,
  CompanyRepository,
} from "../../domain/entities/company.ts";
import { CompanyRepositoryPrisma } from "../../infrastructure/repositories/company.repository.ts";

export class CompanyCommands {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepositoryPrisma();
  }

  async create({
    cnpj,
    socialName,
    fantasyName,
  }: CompanyCreate): Promise<Company> {
    const doesTheCompanyExists = await this.companyRepository.findByCnpj(cnpj);

    if (doesTheCompanyExists) {
      throw new Error(
        "Esta empresa já existe. Entre com outro CNPJ válido e único.",
      );
    }

    const newCompany = await this.companyRepository.create({
      cnpj,
      socialName,
      fantasyName,
    });

    return newCompany;
  }

  async findCompanyByCnpj(cnpj: string): Promise<Company> {
    const company = await this.companyRepository.findByCnpj(cnpj);

    if (!company) {
      throw new Error("Empresa não cadastrada com este CNPJ");
    }

    return company;
  }

  async findCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new Error("Não há empresa com este ID no banco de dados");
    }

    return company;
  }
}
