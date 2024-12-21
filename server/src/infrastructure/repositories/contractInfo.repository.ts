import { prisma } from "../../database/prisma-client.ts";
import {
  ContractInfo,
  ContractInfoCreate,
  ContractInfoRepository,
} from "../../domain/value-objects/contractInfo.ts";

export class ContractInfoRepositoryPrisma implements ContractInfoRepository {
  async create(data: ContractInfoCreate): Promise<ContractInfo> {
    const newContractInfo = await prisma.contractInfo.create({
      data: {
        ...data,
      },
    });

    return newContractInfo;
  }

  async findContractInfoByReceiptNumber(
    receiptNumber: number,
  ): Promise<ContractInfo | null> {
    const contractInfo = await prisma.contractInfo.findFirst({
      where: {
        receiptNumber,
      },
    });

    return contractInfo || null;
  }

  async findContractInfoById(id: string): Promise<ContractInfo | null> {
    const contractInfo = await prisma.contractInfo.findFirst({
      where: {
        id,
      },
    });

    return contractInfo || null;
  }
}
