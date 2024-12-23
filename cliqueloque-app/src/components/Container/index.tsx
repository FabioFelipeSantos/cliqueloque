import { ReactNode } from "react";
import { ContainerStyles } from "./styles";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <ContainerStyles>{children}</ContainerStyles>;
}
