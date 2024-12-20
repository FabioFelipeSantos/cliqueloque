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

  async create(data: ReceiptNotesCreate[]): Promise<ReceiptNotes[]> {
    data.forEach(async item => {
      const receiptNote =
        await this.receiptNotesRepository.findReceiptNotesByFile(item.file);

      if (receiptNote) {
        throw new Error("Já existe uma nota fiscal com este nome armazenada");
      }
    });

    const newReceiptNotes = this.receiptNotesRepository.create(data);

    return newReceiptNotes;
  }
}
