import { useController, UseControllerProps } from "react-hook-form";
import { ReceiptForm } from "@/pages/Receipt";
import { InputFormContainer } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

type InputProps = {
  label: string;
  propsController: UseControllerProps<ReceiptForm>;
};

const inputsAsDate = ["emissionDate", "finalDate"];

export default function InputForm({ label, propsController }: InputProps) {
  const {
    field: { value, onChange, ...field },
    formState: { errors },
  } = useController({ ...propsController, defaultValue: "" });

  const [currentValue, setCurrentValue] = useState<string>(value);
  const [isFirstDigit, setIsFirstDigit] = useState(true);

  useEffect(() => {
    console.log("Use effect");
    const newValue = value;

    if (inputsAsDate.includes(field.name)) return setCurrentValue(value);

    if (field.name === "receiptNumber") {
      setCurrentValue(value.replace(/[^0-9]/g, ""));
    } else {
      if (!/\D/.test(newValue.replace(".", ""))) {
        if (isNaN(Number(value))) return setCurrentValue("");

        const finalValue = Number(value)
          .toFixed(2)
          .toString()
          .replace(".", ",");

        const [intPart, decimalPart] = finalValue.split(",");
        const formattedPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        setCurrentValue(
          ["R$", [formattedPart, decimalPart].join(",")].join(" "),
        );
      }
    }
  }, [value, field.name]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputsAsDate.includes(field.name)) return onChange(event);
    if (field.name === "receiptNumber") return onChange(event);

    const valueRemoved = event.target.value.replace(/[^0-9]/g, "");

    const sizeSlice = valueRemoved.length - 2;

    let newValue;

    if (isFirstDigit) {
      newValue = ["0.0", valueRemoved].join("");
      setIsFirstDigit(false);
    } else {
      newValue = [
        valueRemoved.slice(0, sizeSlice),
        ".",
        valueRemoved.slice(sizeSlice),
      ].join("");
    }

    if (newValue === "." || newValue === "0.00") {
      setIsFirstDigit(true);
    }

    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (
    <InputFormContainer>
      <label htmlFor={field.name}>{label}</label>
      <input
        style={{
          cursor: inputsAsDate.includes(field.name) ? "pointer" : "default",
          textAlign: field.name === "receiptValue" ? "right" : "left",
        }}
        className={errors[`${field.name}`] ? "is-error" : ""}
        type={inputsAsDate.includes(field.name) ? "date" : "text"}
        id={field.name}
        value={currentValue}
        onChange={handleOnChange}
        {...field}
      />

      <ErrorMessage
        name={field.name}
        errors={errors}
        render={({ message }) => <span>{message}</span>}
      />
    </InputFormContainer>
  );
}
