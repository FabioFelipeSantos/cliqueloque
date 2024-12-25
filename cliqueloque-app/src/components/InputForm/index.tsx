import { Control, useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type InputProps = {
  label: string;
  name: string;
  control: Control;
};

export default function InputForm({ label, name, control }: InputProps) {
  const {
    field,
    fieldState: { isTouched },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...field} />
      {isTouched && (
        <ErrorMessage
          name={name}
          errors={errors}
          render={({ message }) => <span>{message}</span>}
        />
      )}
    </div>
  );
}
