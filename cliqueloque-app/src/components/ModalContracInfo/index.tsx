import { useEffect, useState } from "react";
import * as S from "./styles";
import { getAllContractInfo } from "@/utils/serverQueries/getAllContractInfo";
import { convertingToBrazilianCurrency } from "@/utils/convertingToBrazilianCurrency";
import { FileDown } from "lucide-react";

type Props = {
  isOpen: boolean;
  company: ICompany;
  contract: IContract;
  overlayClick: () => void;
};

const nonTaxesInfo = [
  "id",
  "receiptNumber",
  "emissionDate",
  "finalDate",
  "value",
  "contractId",
  "registerNumber",
];

export default function ModalContractInfo({
  company,
  contract,
  isOpen,
  overlayClick,
}: Props) {
  const [contractInfo, setContractInfo] = useState<IContractInfo | null>(null);
  const [receiptNotes, setReceiptNotes] = useState<IFile[] | null>(null);

  useEffect(() => {
    const getContractInfo = async () => {
      if (contract) {
        const { allContractInfo }: IAllContractInfoServerResponse =
          await getAllContractInfo(contract.id);

        if (allContractInfo.contractInfo) {
          setContractInfo(allContractInfo.contractInfo);
        }

        if (allContractInfo.receiptNotes) {
          setReceiptNotes(allContractInfo.receiptNotes);
        }
      }
    };

    getContractInfo();
  }, [contract, setContractInfo, setReceiptNotes]);

  if (!contract) return <></>;

  return (
    <S.ModalContractInfoContainer>
      <S.ModalContractInfoOverLay
        onClick={overlayClick}
      ></S.ModalContractInfoOverLay>

      <S.ModalContractInfoStyle className={isOpen ? "is-open" : ""}>
        <main>
          <S.AroundBox color="#f008" titleSize={18}>
            <h2>Informações da Empresa e do Contrato</h2>

            <S.HeaderCompanyInfoModal>
              <div>
                <p>
                  <strong>Razão Social: </strong>
                  <em>{company.socialName}</em>
                </p>
                <p>
                  <strong>Nome Fantasia: </strong>
                  <em>{company.fantasyName}</em>
                </p>
              </div>
              <p>
                <strong>CNPJ: </strong>
                <em>{company.cnpj}</em>
              </p>
            </S.HeaderCompanyInfoModal>

            <S.HeaderContractInfoModal>
              <S.ContractBoxInfo>
                <h3>Título</h3>
                <p>{contract.title}</p>
              </S.ContractBoxInfo>
              <S.ContractBoxInfo>
                <h3>Número</h3>
                <p>{contract.code}</p>
              </S.ContractBoxInfo>
              <S.ContractBoxInfo>
                <h3>Retenção Técnica</h3>
                <p>{(contract.withholding * 100).toFixed(2)}%</p>
              </S.ContractBoxInfo>
            </S.HeaderContractInfoModal>
          </S.AroundBox>

          <S.ContractInfoContainer>
            <h2>Informações da Nota Fiscal do Fornecedor</h2>

            {contractInfo ? (
              <div>
                <S.ReceiptNumbersAndDateContainer>
                  <div>
                    <S.AroundBox color="#04f8" titleSize={16} leftPos={8}>
                      <h3>Número da Nota</h3>
                      <p>{contractInfo.receiptNumber}</p>
                    </S.AroundBox>

                    <S.AroundBox color="#04f8" titleSize={16} leftPos={8}>
                      <h3>Valor da Nota</h3>
                      <p>{convertingToBrazilianCurrency(contractInfo.value)}</p>
                    </S.AroundBox>
                  </div>

                  <div>
                    <S.AroundBox color="#04f8" titleSize={16} leftPos={8}>
                      <h3>Data Emissão</h3>
                      <p>
                        {new Date(contractInfo.emissionDate).toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    </S.AroundBox>
                    <S.AroundBox color="#04f8" titleSize={16} leftPos={8}>
                      <h3>Data Vencimento</h3>
                      <p>
                        {new Date(contractInfo.finalDate).toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    </S.AroundBox>
                  </div>
                </S.ReceiptNumbersAndDateContainer>

                <S.AroundBox
                  color="#19fa"
                  titleSize={18}
                  style={{ marginTop: "16px" }}
                >
                  <h3>Informações Fiscais</h3>

                  <S.TaxesList style={{ marginTop: "16px" }}>
                    {Object.entries(contractInfo).map(
                      ([key, value]) =>
                        value &&
                        !nonTaxesInfo.includes(key) && (
                          <S.AroundBox
                            color="#98fa"
                            titleSize={16}
                            leftPos={4}
                            key={key}
                          >
                            <h3>
                              {key === "calculatedWithholding"
                                ? "Rest. Técnica"
                                : key.toUpperCase()}
                            </h3>
                            <p>{convertingToBrazilianCurrency(value)}</p>
                          </S.AroundBox>
                        ),
                    )}
                  </S.TaxesList>
                </S.AroundBox>

                {receiptNotes && (
                  <S.AroundBox color="#5a38" titleSize={16} leftPos={8}>
                    <h3>Recibos</h3>

                    <S.ReceiptNotesList>
                      {receiptNotes.map(note => (
                        <li key={note.id}>
                          <a
                            href={`http://localhost:3333/uploads/download/${note.id}`}
                            title={note.fileName}
                            type={note.fileName.slice(-4)}
                          >
                            <FileDown color="#64f" />
                            <p>
                              {note.fileName.length < 8
                                ? note.fileName
                                : [
                                    note.fileName.slice(0, 8),
                                    "... ",
                                    note.fileName.slice(-4),
                                  ].join("")}
                            </p>
                          </a>
                        </li>
                      ))}
                    </S.ReceiptNotesList>
                  </S.AroundBox>
                )}
              </div>
            ) : (
              <h3>Ainda não existem informações para este contrato.</h3>
            )}
          </S.ContractInfoContainer>
        </main>
      </S.ModalContractInfoStyle>
    </S.ModalContractInfoContainer>
  );
}
