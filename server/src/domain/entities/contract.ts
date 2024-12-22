export interface Contract {
  id: string;
  code: string;
  title: string;
  withholding: number;
  companyId: string;
}

export interface ContractCreate {
  code: string;
  title: string;
  withholding: number;
  companyId: string;
}

export interface ContractRepository {
  create(data: ContractCreate): Promise<Contract>;
  findContractByTitle(
    title: string,
    companyId: string,
  ): Promise<Contract | null>;
  findAllContracts(companyId: string): Promise<Contract | Contract[] | null>;
  findContractById(id: string): Promise<Contract | null>;
}
