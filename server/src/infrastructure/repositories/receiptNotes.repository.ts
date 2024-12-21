import { prisma } from "../../database/prisma-client.ts";
import {
  ReceiptNotes,
  ReceiptNotesCreate,
  ReceiptNotesRepository,
} from "../../domain/value-objects/receiptNote.ts";

export class ReceiptNotesRepositoryPrisma implements ReceiptNotesRepository {
  async create(data: ReceiptNotesCreate): Promise<ReceiptNotes> {
    const newReceiptNote = await prisma.receiptNotes.create({
      data: {
        fileName: data.fileName,
        savedFileName: data.savedFileName,
        filePath: data.filePath,
        contractInfoId: data.contractInfoId,
      },
    });

    return newReceiptNote;
  }

  async delete(id: string): Promise<ReceiptNotes> {
    const file = await prisma.receiptNotes.delete({
      where: {
        id,
      },
    });

    return file;
  }

  async findReceiptNotesById(id: string): Promise<ReceiptNotes | null> {
    const file = await prisma.receiptNotes.findFirst({
      where: {
        id,
      },
    });

    return file;
  }

  async findReceiptNotesByFile(fileName: string): Promise<ReceiptNotes | null> {
    const receiptNotes = await prisma.receiptNotes.findFirst({
      where: {
        fileName,
      },
    });

    return receiptNotes;
  }

  async getAllFilesName(): Promise<string[]> {
    const savedFiles = await prisma.receiptNotes.findMany();
    const savedFileNames = savedFiles.map(file => file.fileName);

    return savedFileNames;
  }

  async getReceiptByContract(
    contractInfoId: string,
  ): Promise<ReceiptNotes | ReceiptNotes[] | null> {
    const receipts = await prisma.receiptNotes.findMany({
      where: {
        contractInfoId,
      },
    });

    return receipts || null;
  }
}
