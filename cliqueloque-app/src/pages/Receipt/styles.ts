import { ContainerStyles } from "@/components/Container/styles";
import styled from "styled-components";

export const ReceiptContainer = styled(ContainerStyles)`
  height: 100vh;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 18px;

  & > div {
    width: 100%;
    height: 95%;
    padding: 12px 36px;
    background-color: #fff;
  }
`;
