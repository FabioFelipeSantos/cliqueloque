import { ReactNode } from "react";

import { useCompany } from "@/components/contexts/useCompany";

import { rewriteCnpj } from "@/utils/serverQueries/rewriteCnpj";
import * as S from "./styles";
import logo from "./../../assets/logo.png";

type LayoutProps = {
  children: ReactNode;
  subtitle: string;
};

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export default function Layout({ subtitle, children }: LayoutProps) {
  const { company } = useCompany();

  return (
    <S.LayoutContainer>
      <div>
        <S.HeaderContainer>
          <S.HeaderLogoAndTitle>
            <S.ImageContainer className="image">
              <img src={logo} alt="Logo Clique Loque" />
            </S.ImageContainer>
            <h1 className="title">PAGAMENTO DE FORNECEDOR</h1>
          </S.HeaderLogoAndTitle>

          <div>
            <div>
              <div>
                <strong>Razão Social:</strong>
                <strong>Nome Fantasia</strong>
              </div>
              <div>
                <p>{company.socialName}</p>
                <p>{company.fantasyName}</p>
              </div>
            </div>
            <p>
              <strong>CNPJ</strong>: {rewriteCnpj(company.cnpj)}
            </p>
          </div>

          <h2>{subtitle}</h2>
        </S.HeaderContainer>

        {children}

        <S.FooterContainer>
          <S.ImageContainer className="image">
            <img src={logo} alt="Logo Clique Loque" />
          </S.ImageContainer>

          <p>&copy; 2022 - {currentYear} Construindo Patrimônios</p>
        </S.FooterContainer>
      </div>
    </S.LayoutContainer>
  );
}
