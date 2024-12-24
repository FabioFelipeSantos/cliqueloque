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
}

declare interface IContractServerResponse {
  code: string;
  status: string;
  message: string;
  contract: IContract[] | null;
  erro: string;
}
