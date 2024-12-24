import { createContext, useState, ReactNode, useEffect } from "react";

type CompanyProviderProps = {
  children: ReactNode;
};

const defaultCompany: ICompany = {
  id: "",
  cnpj: "",
  socialName: "",
  fantasyName: "",
};

const CompanyContext = createContext<{
  company: ICompany;
  handlingChangeCompany: (company: ICompany) => void;
}>({
  company: defaultCompany,
  handlingChangeCompany: () => {},
});

const CompanyProvider = function ({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<ICompany>(defaultCompany);

  useEffect(() => {
    const storedCompany = localStorage.getItem("company");
    if (storedCompany) {
      setCompany(JSON.parse(storedCompany));
    }
  }, []);

  useEffect(() => {
    if (company.id !== "") {
      localStorage.setItem("company", JSON.stringify(company));
    }
  }, [company]);

  function handlingChangeCompany(company: ICompany) {
    setCompany(company);
  }

  return (
    <CompanyContext.Provider
      value={{
        company: company,
        handlingChangeCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyProvider, CompanyContext };
