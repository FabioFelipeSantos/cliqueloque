import { prisma } from "../../database/prisma-client.ts";
import {
  Contract,
  ContractCreate,
  ContractRepository,
} from "../../domain/entities/contract.ts";

export class ContractRepositoryPrisma implements ContractRepository {
  async create(data: ContractCreate): Promise<Contract> {
    const result = await prisma.contract.create({
      data: {
        code: data.code,
        title: data.title,
        withholding: data.withholding,
        companyId: data.companyId,
      },
    });

    return result;
  }

  async findAllContracts(companyId: string): Promise<Contract[] | null> {
    const [...result] = await prisma.contract.findMany({
      where: {
        companyId,
      },
    });

    return result || null;
  }

  async findContractByTitle(
    title: string,
    companyId: string,
  ): Promise<Contract | null> {
    const result = await prisma.contract.findFirst({
      where: {
        title,
        companyId,
      },
    });

    return result || null;
  }

  async findContractById(id: string): Promise<Contract | null> {
    const contract = await prisma.contract.findFirst({
      where: {
        id: id,
      },
    });

    return contract || null;
  }
}
