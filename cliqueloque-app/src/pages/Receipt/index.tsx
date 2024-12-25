import { useCompany } from "@/components/contexts/useCompany";
import Header from "@/components/Header";
import { ReceiptContainer } from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { convertingToBrazilianCurrency } from "@/utils/convertingToBrazilianCurrency";

interface ReceiptForm {
  receiptNumber: number;
  emissionDate: Date;
  finalDate: Date;
  receiptValue: number;
  issqn?: number | null;
  irrf?: number | null;
  csll?: number | null;
  cofins?: number | null;
  inss?: number | null;
  pis?: number | null;
  calculatedWithholding?: number | null;
}

// interface ReceiptCreateInfo extends ReceiptForm {
//   contractId: string;
// }

const formValidation = z.object({
  receiptNumber: z
    .number({
      required_error: "Número obrigatório",
      invalid_type_error: "Digite apenas números",
    })
    .positive({ message: "Digite somente os números sem sinal" }),
  emissionDate: z.date({
    required_error: "Entre com uma data",
    invalid_type_error: "Formato DD/MM/AAAA",
  }),
  finalDate: z.date({
    required_error: "Entre com uma data",
    invalid_type_error: "Formato DD/MM/AAAA",
  }),
  receiptValue: z
    .number({
      required_error: "Número obrigatório",
      invalid_type_error: "Digite apenas números",
    })
    .positive({ message: "Digite somente os números sem sinal" }),
  issqn: z.number({ invalid_type_error: "Digite apenas números" }),
  irrf: z.number({ invalid_type_error: "Digite apenas números" }),
  csll: z.number({ invalid_type_error: "Digite apenas números" }),
  cofins: z.number({ invalid_type_error: "Digite apenas números" }),
  inss: z.number({ invalid_type_error: "Digite apenas números" }),
  pis: z.number({ invalid_type_error: "Digite apenas números" }),
  calculatedWithholding: z.number({
    invalid_type_error: "Digite apenas números",
  }),
});

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
  });

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
    register,
    handleSubmit,
    // formState: { errors, isDirty, touchedFields },
  } = useForm<ReceiptForm>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      receiptNumber: 0,
      emissionDate: new Date(),
      finalDate: new Date(),
      receiptValue: 0,
      issqn: null,
      irrf: null,
      csll: null,
      cofins: null,
      inss: null,
      pis: null,
      calculatedWithholding: null,
    },
  });

  function handlingFormSubmission(values: ReceiptForm) {
    console.table(values);
  }

  return (
    <ReceiptContainer>
      <div>
        <Header subtitle="Dados da Nota Fiscal" company={company} />

        <div>
          <div>
            <p>
              <strong>Código do Contrato:</strong> 11056400-03
            </p>
            <h3>Título desse contrato</h3>
          </div>

          <form
            onSubmit={handleSubmit(handlingFormSubmission)}
            encType="multipart/form-data"
          >
            {/* Valores iniciais */}
            <div>
              <div>
                <label htmlFor="receiptNumber">Número da Nota</label>
                <input
                  id="receiptNumber"
                  type="number"
                  {...register("receiptNumber")}
                />
              </div>
              <div>
                <label htmlFor="emissionDate">Data de Emissão</label>
                <input
                  id="emissionDate"
                  type="date"
                  {...register("emissionDate")}
                />
              </div>
              <div>
                <label htmlFor="finalDate">Data de Vencimento</label>
                <input id="finalDate" type="date" {...register("finalDate")} />
              </div>
              <div>
                <label htmlFor="receiptValue">Valor</label>
                <input
                  id="receiptValue"
                  type="number"
                  step="0.01"
                  {...register("receiptValue")}
                />
              </div>
            </div>

            {/* Retenção de impostos */}
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Retenção de Impostos</label>
            </div>
            <div>
              <h4>Dados</h4>
              <div>
                <div>
                  <label htmlFor="issqn">ISSQN</label>
                  <input type="number" id="issqn" {...register("issqn")} />
                </div>
                <div>
                  <label htmlFor="irrf">IRRF</label>
                  <input type="number" id="irrf" {...register("irrf")} />
                </div>
                <div>
                  <label htmlFor="csll">CSLL</label>
                  <input type="number" id="csll" {...register("csll")} />
                </div>
                <div>
                  <label htmlFor="cofins">COFINS</label>
                  <input type="number" id="cofins" {...register("cofins")} />
                </div>
                <div>
                  <label htmlFor="inss">INSS</label>
                  <input type="number" id="inss" {...register("inss")} />
                </div>
                <div>
                  <label htmlFor="pis">PIS</label>
                  <input type="number" id="pis" {...register("pis")} />
                </div>
              </div>
            </div>

            {/* Retenção Técnica */}
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Retenção Técnica</label>
            </div>
            <div>
              <h4>Dados</h4>
              <div>
                <div>
                  <label htmlFor="tecRetention">Valor</label>
                  <input
                    type="string"
                    id="tecRetention"
                    value={convertingToBrazilianCurrency(
                      getValues("receiptValue") * contract.withholding,
                    )}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="withholding">Percentual</label>
                  <input
                    type="string"
                    id="withholding"
                    value={(contract.withholding * 100).toFixed(2)}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Notas fiscais */}
            <div>
              <button type="button">Anexar Nota Fiscal</button>
              <ul>
                <li>
                  <button>Lixo</button>
                  <p>Nome do arquivo</p>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </ReceiptContainer>
  );
}
