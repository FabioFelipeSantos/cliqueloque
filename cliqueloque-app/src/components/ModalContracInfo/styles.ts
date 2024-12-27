import { colors } from "@/globalStyle";
import styled from "styled-components";

export const ModalContractInfoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: transparent;

  position: absolute;
  top: 0;
  left: 0;

  overflow-x: hidden;
`;

export const ModalContractInfoOverLay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  background-color: #00000033;
`;

export const ModalContractInfoStyle = styled.aside`
  width: 60%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 1;
  padding: 16px;
  display: none;
  opacity: 0;
  animation: openModal 0.3s linear 1 forwards reverse;

  background-color: ${colors.bgColor};

  > main {
    overflow-y: scroll;
    padding: 24px 16px;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  &.is-open {
    display: block;
    animation: openModal 0.3s linear 1 forwards;
  }

  @keyframes openModal {
    from {
      right: -100%;
      opacity: 0;
    }
    to {
      right: 0;
      opacity: 1;
    }
  }
`;

type AroundBoxPros = {
  color: string;
  titleSize: number;
  leftPos?: number;
};

export const AroundBox = styled.div<AroundBoxPros>`
  margin-bottom: 16px;
  border: 1px solid ${props => props.color};
  border-radius: 8px;
  padding: 20px 16px;
  position: relative;

  > h2,
  > h3 {
    width: fit-content;
    padding: 2px 16px;
    font-size: ${props => `${props.titleSize}px`};
    font-weight: 700;
    background-color: #fff;
    position: absolute;
    left: ${props => (props.leftPos ? `${props.leftPos}px` : "20px")};
    top: 0;
    transform: translateY(-50%);
  }
`;

export const HeaderCompanyInfoModal = styled.div`
  margin: 8px 0;
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid #0005;
`;

export const HeaderContractInfoModal = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
`;

export const ContractBoxInfo = styled.div`
  border: 1px solid #8f088688;
  border-radius: 6px;
  padding: 12px;
  position: relative;

  h3 {
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
    padding: 4px 8px;
    position: absolute;
    top: 0;
    left: 8px;
    transform: translateY(-50%);
  }

  p {
    font-size: 16px;
  }
`;

export const ContractInfoContainer = styled.div`
  margin: 32px 0;
  border: 1px solid #00f8;
  border-radius: 8px;
  padding: 24px 16px 16px;
  position: relative;

  h2 {
    width: fit-content;
    padding: 2px 16px;
    font-size: 20px;
    font-weight: 700;
    background-color: #fff;
    position: absolute;
    left: 20px;
    top: 0;
    transform: translateY(-50%);
  }

  > h3 {
    margin: 16px;
    text-align: center;
  }
`;

export const ReceiptNumbersAndDateContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  gap: 24px;

  > div {
    width: calc(50% - 12px);
  }
`;

export const TaxesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const ReceiptNotesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  li {
    background-color: #8882;
    padding: 4px 8px;

    > a {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        font-size: 16px;
        line-height: 16px;
        margin-left: 8px;
      }
    }
  }
`;
