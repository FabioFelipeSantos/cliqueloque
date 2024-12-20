export interface Company {
  id: string;
  cnpj: string;
  socialName: string;
  fantasyName: string;
}

export interface CompanyCreate {
  cnpj: string;
  socialName: string;
  fantasyName: string;
}

export interface CompanyRepository {
  create(data: CompanyCreate): Promise<Company>;
  findByCnpj(cnpj: string): Promise<Company | null>;
  findById(id: string): Promise<Company | null>;
}
