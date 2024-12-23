import { ContainerStyles } from "@/components/Container/styles";
import { colors } from "@/globalStyle";
import styled from "styled-components";

export const LayoutContainer = styled(ContainerStyles)`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
    padding: 12px 36px;

    background-color: #fff;
  }
`;

export const ImageContainer = styled.div`
  width: 120px;
  padding: 8px;

  background-color: ${colors.logoBgColor};

  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const HeaderContainer = styled.header`
  margin-bottom: 8px;

  display: flex;
  flex-direction: column;
`;

export const HeaderLogoAndTitle = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h1 {
    width: 80%;

    font-size: 44px;
    font-weight: 700;
    text-align: center;
  }
`;

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  p {
    width: 60%;

    font-size: 14px;
    text-align: left;
  }
`;
