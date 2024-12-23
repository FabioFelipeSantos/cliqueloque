import { useContext } from "react";
import { CompanyContext } from "./CompanyProvider";

export const useCompany = function () {
  const context = useContext(CompanyContext);

  return context;
};
