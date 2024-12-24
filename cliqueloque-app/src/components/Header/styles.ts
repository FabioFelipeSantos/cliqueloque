import { colors } from "@/globalStyle";
import styled from "styled-components";

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
  width: 100%;

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

export const CompanyInfoContainer = styled.div`
  margin-bottom: 16px;
  padding: 12px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  border: 1px solid red;
  border-radius: 8px;
`;

export const NamesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  .names-title > strong {
    display: block;
  }

  .names {
    margin-left: 8px;

    p {
      font-style: italic;
    }
  }
`;

export const SubtitleStyle = styled.h2`
  padding: 4px 0;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid red;
  border-radius: 8px;
`;
