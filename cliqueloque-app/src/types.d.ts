declare interface ICompany {
  id: string;
  cnpj: string;
  socialName: string;
  fantasyName: string;
}

declare interface ICompanyServerResponse {
  code: number;
  status: string;
  mensagem: string;
  company: ICompany | null;
  error: string;
}

declare interface IContract {
  id: string;
  code: string;
  title: string;
  withholding: number;
  companyId: string;
  hasInfo: boolean;
}

declare interface IContractServerResponse {
  code: string;
  status: string;
  message: string;
  contract: IContract[] | null;
  erro: string;
}

declare interface IContractInfo {
  id: string;
  receiptNumber: number;
  emissionDate: Date;
  finalDate: Date;
  value: number;
  issqn?: number | null;
  irrf?: number | null;
  csll?: number | null;
  cofins?: number | null;
  inss?: number | null;
  pis?: number | null;
  calculatedWithholding?: number | null;
  contractId: string;
  registerNumber: string;
}

declare interface IContractInfoCreate {
  receiptNumber: number;
  emissionDate: string;
  finalDate: string;
  value: number;
  issqn?: number | null;
  irrf?: number | null;
  csll?: number | null;
  cofins?: number | null;
  inss?: number | null;
  pis?: number | null;
  calculatedWithholding?: number | null;
  contractId: string;
}

declare interface IContractInfoServerResponse {
  code: string;
  status: string;
  message: string;
  contractInfo: IContractInfo | null;
  erro: string;
}

declare interface IFile {
  id: string;
  fileName: string;
  savedFileName: string;
  filePath: string;
  contractInfoId: string;
}

declare interface IReceiptNotesServerResponse {
  code: string;
  status: string;
  message: string;
  file: IFile;
  erro: string;
}

declare interface IAllContractInfo {
  contractInfo: IContractInfo | null;
  receiptNotes: IFile[] | null;
}

declare interface IAllContractInfoServerResponse {
  code: number;
  status: string;
  message: string;
  allContractInfo: IAllContractInfo;
  error: string;
}
