import { ContainerStyles } from "@/components/Container/styles";
import styled from "styled-components";

export const ReceiptContainer = styled(ContainerStyles)`
  width: 80%;
  padding: 32px 0;
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

export const ReceiptInfo = styled.div`
  margin: 16px 0;
  padding: 16px;

  font-size: 16px;
  border: 1px solid red;
  border-radius: 8px;
`;

export const ContractInfoContainer = styled.div`
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  gap: 64px;

  strong {
    margin-right: 4px;
  }
`;

export const ReceiptMainInfoStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 36px;
`;

export const TaxCheckBoxInputs = styled.div`
  margin: 16px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  input {
    display: block;
    width: 20px;
    aspect-ratio: 1;
  }

  label {
    display: block;
    line-height: 16px;
  }
`;

export const TaxRetentionContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px;

  position: relative;

  border: 1px solid red;
  border-radius: 8px;

  h4 {
    width: 80px;
    padding-left: 12px;

    font-size: 18px;
    font-weight: 500;
    background-color: #fff;

    position: absolute;
    top: 0;
    transform: translateY(-50%);
  }

  > div {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 16px;

    label {
      padding-left: 4px;
    }
  }
`;

export const TechnicalRetentionStyle = styled(TaxRetentionContainer)`
  > div {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 48px;
  }

  .pseudo-inputs {
    padding: 4px 12px;
    background-color: #bbb;
    border-radius: 4px;
  }
`;

export const ReceiptNoteContainer = styled.div`
  margin: 24px 0;

  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;

  button {
    border-radius: 4px;
    &:hover {
      cursor: pointer;
    }
  }

  > div > button {
    display: block;
    width: 100%;
    padding: 4px 16px;
    background-color: #67685a;
    color: #fff;
    &:hover {
      background-color: #67688b;
    }
  }

  ul {
    width: 80%;
    font-size: 14px;
  }

  li {
    padding: 6px 16px;
    margin-bottom: 6px;
    display: block;
    width: 100%;
    list-style: none;
    background-color: #f8f8f8;

    &:hover {
      background-color: #f0f0f0;
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    button {
      padding: 4px 6px;
      background-color: #f00;

      &:hover {
        background-color: #d00;
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;
