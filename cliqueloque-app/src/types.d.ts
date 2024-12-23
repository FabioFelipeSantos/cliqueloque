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
