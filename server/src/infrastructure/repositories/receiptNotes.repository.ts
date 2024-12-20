import { prisma } from "../../database/prisma-client.ts";
import {
  ReceiptNotes,
  ReceiptNotesCreate,
  ReceiptNotesRepository,
} from "../../domain/value-objects/receiptNote.ts";

export class ReceiptNotesRepositoryPrisma implements ReceiptNotesRepository {
  async create(
    receiptNodesData: ReceiptNotesCreate[],
  ): Promise<ReceiptNotes[]> {
    const newReceiptNotes = await prisma.receiptNotes.createManyAndReturn({
      data: [...receiptNodesData],
    });

    return newReceiptNotes;
  }

  async findReceiptNotesByFile(file: string): Promise<ReceiptNotes | null> {
    const receiptNotes = await prisma.receiptNotes.findFirst({
      where: {
        file,
      },
    });

    return receiptNotes;
  }
}
