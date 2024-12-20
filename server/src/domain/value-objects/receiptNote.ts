export interface ReceiptNotes {
  id: string;
  name: string;
  file: string;
  contractInfoId: string;
}

export interface ReceiptNotesCreate {
  name: string;
  file: string;
  contractInfoId: string;
}

export interface ReceiptNotesRepository {
  create(data: ReceiptNotesCreate[]): Promise<ReceiptNotes[]>;
  findReceiptNotesByFile(file: string): Promise<ReceiptNotes | null>;
}
