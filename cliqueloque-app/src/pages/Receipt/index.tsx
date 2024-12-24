import { useCompany } from "@/components/contexts/useCompany";
import Header from "@/components/Header";
import { ReceiptContainer } from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

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

interface ReceiptCreateInfo extends ReceiptForm {
  contractId: string;
}

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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ReceiptForm>({
    resolver: zodResolver(formValidation),
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
      calculatedWithholding: "",
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

          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(handlingFormSubmission)}
              encType="multipart/form-data"
            >
              {/* Valores iniciais */}
              <div>
                <div>
                  <label htmlFor="">Número da Nota</label>
                  <input type="number" />
                </div>
                <div>
                  <label htmlFor="">Data de Emissão</label>
                  <input type="date" />
                </div>
                <div>
                  <label htmlFor="">Data de Vencimento</label>
                  <input type="date" />
                </div>
                <div>
                  <label htmlFor="">Valor</label>
                  <input type="number" step="0.01" />
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
                    <label htmlFor="">ISSQN</label>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">IRRF</label>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">CSLL</label>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">COFINS</label>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">INSS</label>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">PIS</label>
                    <input type="number" name="" id="" />
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
                    <label htmlFor="">Valor</label>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">Percentual</label>
                    <input type="number" name="" id="" />
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
          </Form>
        </div>
      </div>
    </ReceiptContainer>
  );
}
