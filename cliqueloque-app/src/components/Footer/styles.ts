import { colors } from "@/globalStyle";
import styled from "styled-components";

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

export const ImageFooterContainer = styled.div`
  width: 120px;
  padding: 8px;

  background-color: ${colors.logoBgColor};

  img {
    width: 100%;
    object-fit: cover;
  }
`;
