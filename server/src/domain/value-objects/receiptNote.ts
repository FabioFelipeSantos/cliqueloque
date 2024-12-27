export interface ReceiptNotes {
  id: string;
  fileName: string;
  savedFileName: string;
  filePath: string;
  contractInfoId: string;
}

export interface ReceiptNotesCreate {
  fileName: string;
  savedFileName: string;
  filePath: string;
  contractInfoId: string;
}

export interface ReceiptNotesRepository {
  create(data: ReceiptNotesCreate): Promise<ReceiptNotes>;
  delete(id: string): Promise<ReceiptNotes>;
  findReceiptNotesByFile(file: string): Promise<ReceiptNotes | null>;
  findReceiptNotesById(id: string): Promise<ReceiptNotes | null>;
  getAllFilesName(): Promise<string[] | null>;
  getReceiptByContract(contractInfoId: string): Promise<ReceiptNotes[] | null>;
}
