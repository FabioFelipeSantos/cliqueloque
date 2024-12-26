import { useCompany } from "@/components/contexts/useCompany";
import Header from "@/components/Header";
import * as S from "./styles";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { convertingToBrazilianCurrency } from "@/utils/convertingToBrazilianCurrency";
import InputForm from "@/components/InputForm";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { sendData, SendDataResponse } from "@/utils/serverQueries/sendData";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface ReceiptForm {
  receiptNumber: string;
  emissionDate: string;
  finalDate: string;
  receiptValue: string;
  issqn: string;
  irrf: string;
  csll: string;
  cofins: string;
  inss: string;
  pis: string;
}

export default function Receipts() {
  const { company } = useCompany();
  const { contractId } = useParams<{ contractId: string }>() as {
    contractId: string;
  };
  const [contract, setContract] = useState<IContract>({
    id: "",
    code: "",
    title: "",
    companyId: "",
    withholding: 0,
    hasInfo: false,
  });
  const [taxeFormVisible, setTaxeFormVisible] = useState(false);
  const [technicalRetentionVisible, setTechnicalRetentionVisible] =
    useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [receiptNotes, setReceiptNotes] = useState<File[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<ReactNode>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getContract = async () => {
      const contractFetchURL = `${import.meta.env.VITE_SERVER_URL}/contracts/contract/${contractId}`;
      const response = await fetch(contractFetchURL);

      if (response.ok) {
        const { contract }: { contract: IContract } = await response.json();

        setContract(contract);
      }
    };

    getContract();
  }, [contractId]);

  const {
    getValues,
    handleSubmit,
    control,
    // formState: { errors, isDirty, touchedFields },
  } = useForm<ReceiptForm>({
    // resolver: zodResolver(formValidation),
    defaultValues: {
      receiptNumber: "",
      emissionDate: "",
      finalDate: "",
      receiptValue: "",
      issqn: "",
      irrf: "",
      csll: "",
      cofins: "",
      inss: "",
      pis: "",
    },
  });

  async function handlingFormSubmission(values: ReceiptForm) {
    const contractInfo: IContractInfoCreate = {
      receiptNumber: Number(values.receiptNumber),
      emissionDate: values.emissionDate,
      finalDate: values.finalDate,
      value: Number(values.receiptValue),
      issqn: values.issqn === "" ? null : Number(values.issqn),
      irrf: values.irrf === "" ? null : Number(values.irrf),
      csll: values.csll === "" ? null : Number(values.csll),
      cofins: values.cofins === "" ? null : Number(values.cofins),
      inss: values.inss === "" ? null : Number(values.inss),
      pis: values.pis === "" ? null : Number(values.pis),
      calculatedWithholding: Number(values.receiptValue) * contract.withholding,
      contractId: contract.id,
    };

    const response: SendDataResponse = await sendData(
      contractInfo,
      receiptNotes.length > 0 ? receiptNotes : null,
    );

    if (!response.contractInfoResponse.contractInfo) {
      throw new Error(
        "As informações do contrato não podem chegar a este ponto sendo nulas. Verifique a requisição bem como a resposta do servidor.",
      );
    }

    const registerNumber =
      response.contractInfoResponse.contractInfo.registerNumber.toUpperCase();

    setModalMessage(
      <>
        <p>
          A solicitação{" "}
          <strong>
            <em>{registerNumber}</em>
          </strong>{" "}
          foi enviada com sucesso.
        </p>
      </>,
    );
    setOpenModal(true);
  }

  return (
    <S.ReceiptContainer>
      <div>
        <Header subtitle="Dados da Nota Fiscal" company={company} />

        <S.ReceiptInfo>
          <S.ContractInfoContainer>
            <p>
              <strong>Código do Contrato:</strong> {contract.code}
            </p>
            <h3>{contract.title}</h3>
          </S.ContractInfoContainer>

          <form
            onSubmit={handleSubmit(handlingFormSubmission)}
            encType="multipart/form-data"
          >
            {/* Valores iniciais */}
            <S.ReceiptMainInfoStyle>
              <InputForm
                label="Número da Nota"
                propsController={{
                  name: "receiptNumber",
                  control,
                  rules: {
                    required: "Número da Nota Obrigatório",
                    pattern: {
                      value: /\d+/,
                      message: "Deve ser um número",
                    },
                    min: {
                      value: 0,
                      message: "Deve ser maior que zero",
                    },
                  },
                }}
              />
              <InputForm
                label="Data de Emissão"
                propsController={{
                  name: "emissionDate",
                  control,
                  rules: {
                    required: "Data de Emissão Obrigatório",
                  },
                }}
              />
              <InputForm
                label="Data de Vencimento"
                propsController={{
                  name: "finalDate",
                  control,
                  rules: {
                    required: "Data de Vencimento Obrigatório",
                  },
                }}
              />
              <InputForm
                label="Valor"
                propsController={{
                  name: "receiptValue",
                  control,
                  rules: {
                    required: "Valor Obrigatório",
                    pattern: {
                      value: /\d+/,
                      message: "Deve ser um número",
                    },
                    min: {
                      value: 0,
                      message: "Deve ser maior que zero",
                    },
                  },
                }}
              />
            </S.ReceiptMainInfoStyle>

            {/* Retenção de impostos */}
            <S.TaxCheckBoxInputs>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => setTaxeFormVisible(state => !state)}
              />
              <label htmlFor="">Retenção de Impostos</label>
            </S.TaxCheckBoxInputs>

            {taxeFormVisible && (
              <>
                <S.TaxRetentionContainer>
                  <h4>Dados</h4>

                  <div>
                    <InputForm
                      label="ISSQN"
                      propsController={{
                        name: "issqn",
                        control,
                        rules: {
                          pattern: {
                            value: /\d+/,
                            message: "ISSQN deve ser um número",
                          },
                          min: {
                            value: 0,
                            message: "ISSQN deve ser maior que zero",
                          },
                        },
                      }}
                    />
                    <InputForm
                      label="IRRF"
                      propsController={{
                        name: "irrf",
                        control,
                        rules: {
                          pattern: {
                            value: /\d+/,
                            message: "IRRF deve ser um número",
                          },
                          min: {
                            value: 0,
                            message: "IRRF deve ser maior que zero",
                          },
                        },
                      }}
                    />
                    <InputForm
                      label="CSLL"
                      propsController={{
                        name: "csll",
                        control,
                        rules: {
                          pattern: {
                            value: /\d+/,
                            message: "CSLL deve ser um número",
                          },
                          min: {
                            value: 0,
                            message: "CSLL deve ser maior que zero",
                          },
                        },
                      }}
                    />
                    <InputForm
                      label="COFINS"
                      propsController={{
                        name: "cofins",
                        control,
                        rules: {
                          pattern: {
                            value: /\d+/,
                            message: "COFINS deve ser um número",
                          },
                          min: {
                            value: 0,
                            message: "COFINS deve ser maior que zero",
                          },
                        },
                      }}
                    />
                    <InputForm
                      label="INSS"
                      propsController={{
                        name: "inss",
                        control,
                        rules: {
                          pattern: {
                            value: /\d+/,
                            message: "INSS deve ser um número",
                          },
                          min: {
                            value: 0,
                            message: "INSS deve ser maior que zero",
                          },
                        },
                      }}
                    />
                    <InputForm
                      label="PIS"
                      propsController={{
                        name: "pis",
                        control,
                        rules: {
                          pattern: {
                            value: /\d+/,
                            message: "PIS deve ser um número",
                          },
                          min: {
                            value: 0,
                            message: "PIS deve ser maior que zero",
                          },
                        },
                      }}
                    />
                  </div>
                </S.TaxRetentionContainer>
              </>
            )}

            {/* Retenção Técnica */}
            <S.TaxCheckBoxInputs>
              <input
                type="checkbox"
                onChange={() => setTechnicalRetentionVisible(state => !state)}
              />
              <label htmlFor="">Retenção Técnica</label>
            </S.TaxCheckBoxInputs>

            {technicalRetentionVisible && (
              <>
                <S.TechnicalRetentionStyle>
                  <h4>Dados</h4>

                  <div>
                    <div>
                      <span>Valor</span>
                      <div className="pseudo-inputs">
                        {convertingToBrazilianCurrency(
                          Number(getValues("receiptValue")) *
                            contract.withholding,
                        )}
                      </div>
                    </div>
                    <div>
                      <span>Percentual</span>
                      <div className="pseudo-inputs">
                        {(contract.withholding * 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </S.TechnicalRetentionStyle>
              </>
            )}

            {/* Notas fiscais */}
            <S.ReceiptNoteContainer>
              <div>
                <input
                  ref={inputFileRef}
                  type="file"
                  name="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  style={{ display: "none" }}
                  onChange={e => {
                    const inputFile = e.target as HTMLInputElement;
                    const fileUploaded: File = inputFile.files![0] as File;
                    setReceiptNotes([...receiptNotes, fileUploaded]);
                  }}
                />
                <button
                  type="button"
                  onClick={() => inputFileRef.current?.click()}
                >
                  Anexar arquivos
                </button>
              </div>

              <ul>
                {receiptNotes.map(file => (
                  <li key={file.lastModified}>
                    <div>
                      <button
                        onClick={() =>
                          setReceiptNotes([
                            ...receiptNotes.filter(
                              input => input.name !== file.name,
                            ),
                          ])
                        }
                      >
                        <Trash2 size={16} color="#fff" />
                      </button>
                      <p>{file.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </S.ReceiptNoteContainer>

            <S.ButtonsContainer>
              <Button
                className="bg-[#ffaa00] hover:bg-[#ee9900] text-lg py-4 font-bold w-[25%]"
                onClick={() => navigate(`/company/${company.id}`)}
              >
                Anterior
              </Button>
              <Button
                className="bg-[#008b47] hover:bg-[#007a47] text-lg py-4 font-bold w-[25%]"
                type="submit"
              >
                Próximo
              </Button>
            </S.ButtonsContainer>
          </form>
        </S.ReceiptInfo>

        <Footer />

        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="border-b-[1px] border-slate-300 mb-4 text-2xl">
                Envio Realizado
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[16px] text-black">
                {modalMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="px-6 bg-blue-900 hover:bg-blue-700">
                <Button
                  className="px-6 bg-blue-900 hover:bg-blue-700"
                  onClick={() => {
                    setOpenModal(false);
                    navigate("/");
                  }}
                >
                  Acessar Novamente
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </S.ReceiptContainer>
  );
}
