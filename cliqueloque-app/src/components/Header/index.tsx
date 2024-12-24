import { rewriteCnpj } from "@/utils/rewriteCnpj";
import * as S from "./styles";
import logo from "./../../assets/logo.png";

type LayoutProps = {
  subtitle: string;
  company: ICompany;
};

export default function Header({ subtitle, company }: LayoutProps) {
  return (
    <S.HeaderContainer>
      <S.HeaderLogoAndTitle>
        <S.ImageContainer className="image">
          <img src={logo} alt="Logo Clique Loque" />
        </S.ImageContainer>
        <h1 className="title">PAGAMENTO DE FORNECEDOR</h1>
      </S.HeaderLogoAndTitle>

      <S.CompanyInfoContainer>
        <S.NamesContainer>
          <div className="names-title">
            <strong>Razão Social:</strong>
            <strong>Nome Fantasia:</strong>
          </div>

          <div className="names">
            <p>{company.socialName}</p>
            <p>{company.fantasyName}</p>
          </div>
        </S.NamesContainer>

        <p>
          <strong>CNPJ</strong>: <em>{rewriteCnpj(company.cnpj)}</em>
        </p>
      </S.CompanyInfoContainer>

      <S.SubtitleStyle>{subtitle}</S.SubtitleStyle>
    </S.HeaderContainer>
  );
}
