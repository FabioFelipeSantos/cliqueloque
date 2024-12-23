import {
  Company,
  CompanyCreate,
  CompanyRepository,
} from "../../domain/entities/company.ts";
import { CompanyRepositoryPrisma } from "../../infrastructure/repositories/company.repository.ts";
import isValidCnpj from "../../utils/isValidCnpj.ts";

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

  async findCompanyByCnpj(cnpj: string): Promise<Company | null> {
    if (cnpj.length !== 14) {
      throw new Error(
        "CNPJ com número de algarismos diferente de 14. Confira o dado.",
      );
    }

    if (!isValidCnpj(cnpj)) {
      throw new Error(
        "O CNPJ informado não é válido, confira os números digitados",
      );
    }

    const parsingCnpj = cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );

    const company = await this.companyRepository.findByCnpj(parsingCnpj);

    return company;
  }

  async findCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new Error("Não há empresa com este ID no banco de dados");
    }

    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    const companies = await this.companyRepository.getAllCompanies();

    if (!companies) {
      throw new Error("Nenhuma empresa cadastrada");
    }

    return companies;
  }
}

// 99.999.999/0001-XX
// 12.345.678/9012-34
