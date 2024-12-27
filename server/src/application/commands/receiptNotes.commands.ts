import { ContractInfoRepository } from "../../domain/value-objects/contractInfo.ts";
import {
  ReceiptNotes,
  ReceiptNotesCreate,
  ReceiptNotesRepository,
} from "../../domain/value-objects/receiptNote.ts";
import { ContractInfoRepositoryPrisma } from "../../infrastructure/repositories/contractInfo.repository.ts";
import { ReceiptNotesRepositoryPrisma } from "../../infrastructure/repositories/receiptNotes.repository.ts";

export class ReceiptNotesCommands {
  private receiptNotesRepository: ReceiptNotesRepository;
  private contractInfoRepository: ContractInfoRepository;

  constructor() {
    this.receiptNotesRepository = new ReceiptNotesRepositoryPrisma();
    this.contractInfoRepository = new ContractInfoRepositoryPrisma();
  }

  async create({
    fileName,
    savedFileName,
    filePath,
    contractInfoId,
  }: ReceiptNotesCreate): Promise<ReceiptNotes> {
    const receiptNote =
      await this.receiptNotesRepository.findReceiptNotesByFile(fileName);

    if (receiptNote) {
      throw new Error("Já existe uma nota fiscal com este nome armazenada");
    }

    const newReceiptNotes = this.receiptNotesRepository.create({
      fileName,
      savedFileName,
      filePath,
      contractInfoId,
    });

    return newReceiptNotes;
  }

  async delete(id: string): Promise<ReceiptNotes> {
    const file = await this.receiptNotesRepository.findReceiptNotesById(id);

    if (!file) {
      throw new Error("Não existe nota fiscal com esse nome");
    }

    const result = await this.receiptNotesRepository.delete(id);

    return result;
  }

  async getAllFilesName(): Promise<string[]> {
    const savedFileName = await this.receiptNotesRepository.getAllFilesName();

    if (!savedFileName) {
      throw new Error("Nenhum arquivo ainda foi salvo");
    }

    return savedFileName;
  }

  async getReceiptByContract(contractInfoId: string) {
    const contractInfo =
      this.contractInfoRepository.findContractInfoById(contractInfoId);

    if (!contractInfo) {
      throw new Error("Não há contrato com o id procurado");
    }

    const receiptNotes =
      await this.receiptNotesRepository.getReceiptByContract(contractInfoId);

    return receiptNotes;
  }

  async findReceiptNotesById(id: string): Promise<ReceiptNotes> {
    const receiptNote =
      await this.receiptNotesRepository.findReceiptNotesById(id);

    if (!receiptNote) {
      throw new Error("Arquivo não encontrado");
    }

    return receiptNote;
  }
}
