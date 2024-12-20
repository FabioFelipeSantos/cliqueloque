export interface Contract {
  id: string;
  code: string;
  title: string;
  withholding: number;
  companyCnpj: string;
}

export interface ContractCreate {
  code: string;
  title: string;
  withholding: number;
  companyCnpj: string;
}

export interface ContractRepository {
  create(data: ContractCreate): Promise<Contract>;
  findContractByTitle(title: string): Promise<Contract | null>;
  findAllContracts(companyCnpj: string): Promise<Contract | Contract[] | null>;
  findContractById(id: string): Promise<Contract | null>;
}
