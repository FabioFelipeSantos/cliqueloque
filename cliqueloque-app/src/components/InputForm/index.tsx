import { useController, UseControllerProps } from "react-hook-form";
import { ReceiptForm } from "@/pages/Receipt";
import { InputFormContainer } from "./styles";

type InputProps = {
  label: string;
  propsController: UseControllerProps<ReceiptForm>;
};

const inputsAsDate = ["emissionDate", "finalDate"];

function formatReceiptInputsInfo(value: string, inputName: string) {
  if (inputsAsDate.includes(inputName)) return value;

  return value.replace(/[^0-9.,]/g, "");
}

export default function InputForm({ label, propsController }: InputProps) {
  const {
    field: { value, ...field },
    fieldState: { isDirty, isTouched, error },
  } = useController({ ...propsController });

  return (
    <InputFormContainer>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={isTouched && error ? "is-error" : ""}
        style={field.name === "receiptValue" ? { textAlign: "right" } : {}}
        type={inputsAsDate.includes(field.name) ? "date" : "string"}
        id={field.name}
        value={formatReceiptInputsInfo(value, field.name)}
        {...field}
      />
      {(isDirty || isTouched) && <span>{error?.message}</span>}
    </InputFormContainer>
  );
}
