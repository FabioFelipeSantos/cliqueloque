import { prisma } from "../../database/prisma-client.ts";
import {
  Company,
  CompanyCreate,
  CompanyRepository,
} from "../../domain/entities/company.ts";

export class CompanyRepositoryPrisma implements CompanyRepository {
  async create(data: CompanyCreate): Promise<Company> {
    const result = await prisma.company.create({
      data: {
        cnpj: data.cnpj,
        socialName: data.socialName,
        fantasyName: data.fantasyName,
      },
    });

    return result;
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const result = await prisma.company.findFirst({
      where: {
        cnpj,
      },
    });

    return result || null;
  }

  async findById(id: string): Promise<Company | null> {
    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    return company || null;
  }

  async getAllCompanies(): Promise<Company[] | null> {
    const companies = await prisma.company.findMany();

    return companies || null;
  }
}
