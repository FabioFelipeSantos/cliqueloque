export interface ContractInfo {
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
}

export interface ContractInfoCreate {
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
}

export interface ContractInfoRepository {
  create(data: ContractInfoCreate): Promise<ContractInfo>;
  findContractInfoByReceiptNumber(
    receiptNumber: number,
  ): Promise<ContractInfo | null>;
  findContractInfoById(id: string): Promise<ContractInfo | null>;
}
