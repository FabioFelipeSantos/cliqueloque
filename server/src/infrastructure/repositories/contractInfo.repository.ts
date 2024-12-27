import { prisma } from "../../database/prisma-client.ts";
import {
  ContractInfo,
  ContractInfoCreate,
  ContractInfoRepository,
} from "../../domain/value-objects/contractInfo.ts";
import crypto from "crypto";

export class ContractInfoRepositoryPrisma implements ContractInfoRepository {
  async create(data: ContractInfoCreate): Promise<ContractInfo> {
    const registerNumber = crypto.randomBytes(4).toString("hex");

    const newContractInfo = await prisma.contractInfo.create({
      data: {
        registerNumber,
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

  async findContractInfoByContractId(
    contractId: string,
  ): Promise<ContractInfo | null> {
    const contractInfo = await prisma.contractInfo.findFirst({
      where: {
        contractId,
      },
    });

    return contractInfo || null;
  }
}
