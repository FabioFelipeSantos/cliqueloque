import { ContainerStyles } from "@/components/Container/styles";
import styled from "styled-components";

export const LayoutContainer = styled(ContainerStyles)`
  height: 100vh;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 18px;

  & > div {
    width: 100%;
    padding: 12px 36px;

    background-color: #fff;
  }
`;

export const WithoutContractsInfo = styled.div`
  width: 70%;
  height: 15vh;
  margin: 28px auto;
  padding: 16px;

  border: 1px solid #000;
  border-radius: 16px;
  box-shadow: 2px 2px 10px 4px #0002;
  background-color: #eeeeeebb;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
`;

export const ContractsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const TableContainer = styled.div`
  width: 100%;
  max-height: 38vh;
  margin: 16px 0;

  overflow-y: scroll;
`;

export const ButtonsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;
