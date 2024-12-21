import {
  ReceiptNotes,
  ReceiptNotesCreate,
  ReceiptNotesRepository,
} from "../../domain/value-objects/receiptNote.ts";
import { ReceiptNotesRepositoryPrisma } from "../../infrastructure/repositories/receiptNotes.repository.ts";

export class ReceiptNotesCommands {
  receiptNotesRepository: ReceiptNotesRepository;

  constructor() {
    this.receiptNotesRepository = new ReceiptNotesRepositoryPrisma();
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
}
