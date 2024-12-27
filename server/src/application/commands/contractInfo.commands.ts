import { ContractRepository } from "../../domain/entities/contract.ts";
import {
  ContractInfo,
  ContractInfoCreate,
  ContractInfoRepository,
} from "../../domain/value-objects/contractInfo.ts";
import { ContractRepositoryPrisma } from "../../infrastructure/repositories/contract.repository.ts";
import { ContractInfoRepositoryPrisma } from "../../infrastructure/repositories/contractInfo.repository.ts";

export class ContractInfoCommands {
  private contractInfoRepository: ContractInfoRepository;
  private contractRepository: ContractRepository;

  constructor() {
    this.contractInfoRepository = new ContractInfoRepositoryPrisma();
    this.contractRepository = new ContractRepositoryPrisma();
  }

  async create(data: ContractInfoCreate): Promise<ContractInfo> {
    const contract = await this.contractRepository.findContractById(
      data.contractId,
    );

    if (!contract) {
      throw new Error(
        "Não é possível armazenar informações de um contrato não criado",
      );
    }

    const contractInfo =
      await this.contractInfoRepository.findContractInfoByReceiptNumber(
        data.receiptNumber,
      );

    if (contractInfo) {
      throw new Error("Já existe informações para este contrato");
    }

    const newContractInfo = this.contractInfoRepository.create(data);
    await this.contractRepository.changeHasInfo(data.contractId);

    return newContractInfo;
  }

  async findContractInfoById(id: string): Promise<ContractInfo> {
    const contractInfo =
      await this.contractInfoRepository.findContractInfoById(id);

    if (!contractInfo) {
      throw new Error(`Nenhum contrato com o id: ${id} foi encontrado`);
    }

    return contractInfo;
  }

  async findContractInfoByContractId(
    contractId: string,
  ): Promise<ContractInfo | null> {
    const contract = await this.contractRepository.findContractById(contractId);

    if (!contract)
      throw new Error(`Não existe contrato com o id: ${contractId}.`);

    const contractInfo =
      await this.contractInfoRepository.findContractInfoByContractId(
        contractId,
      );

    return contractInfo;
  }
}
