import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { withMask } from "use-mask-input";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CardContainer } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/utils/serverQueries/login";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useCompany } from "@/components/contexts/useCompany";

import logo from "./../../assets/logo.png";
import PulseSpinner from "@/components/PulseSpinner";

type CnpjForm = {
  cnpj: string;
};

const formValidation = z.object({
  cnpj: z.string().length(14, {
    message:
      "O CNPJ precisa ter exatamente 14 números. Digite apenas os números.",
  }),
});

type ModalInfo = {
  title: string;
  message: string;
};

export default function Login() {
  const [isLoginResolved, setIsLoginResolved] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    title: "",
    message: "",
  });
  const { handlingChangeCompany } = useCompany();

  const navigate = useNavigate();

  const form = useForm<CnpjForm>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      cnpj: "17070407000198",
    },
  });

  async function handlingSubmission(values: CnpjForm) {
    setIsLoginResolved(false);

    try {
      const requestedCompanyResult = await login(values.cnpj);

      if (!requestedCompanyResult.company) {
        setModalInfo({
          title: "CNPJ não cadastrado.",
          message:
            "Confira se os dados da sua empresa estão cadastrados em nossa plataforma. Para mais informações, entre em contato conosco.",
        });
        setOpen(true);
      } else {
        handlingChangeCompany(requestedCompanyResult.company);

        navigate(`company/${requestedCompanyResult.company.id}`);

        form.reset();
      }
    } catch {
      setModalInfo({
        title: "CNPJ inválido.",
        message:
          "Confira os dígitos entrados para ver se não houve algum erro.",
      });
      setOpen(true);
    }

    setIsLoginResolved(true);
  }

  return (
    <>
      <CardContainer>
        <Card className="w-4/6 p-8 border shadow-card border-slate-500">
          <CardTitle className="flex flex-col items-center justify-center w-full">
            <div className="bg-[#0d455f] w-44 mb-6 p-2">
              <img src={logo} alt="Logo Clique Loque" />
            </div>
            <h1 className="mb-4">Pagamento de Fornecedor</h1>
          </CardTitle>
          <CardDescription className=" px-8 py-6 w-8/12 m-[auto] flex justify-center border-[1px] border-slate-300">
            {isLoginResolved ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handlingSubmission)}
                  className="w-full mb-8 space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Digite seu CNPJ:</FormLabel>
                        <FormControl
                          ref={withMask("cnpj", {
                            jitMasking: true,
                            autoUnmask: true,
                          })}
                        >
                          <Input
                            className="p-5 text-slate-600"
                            placeholder="Digite seu CNPJ..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="block w-4/5 mx-[auto] font-normal text-[1rem] bg-[#03a64d]"
                    type="submit"
                  >
                    Acessar
                  </Button>
                </form>
              </Form>
            ) : (
              <PulseSpinner />
            )}
          </CardDescription>
        </Card>
      </CardContainer>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="border-b-[1px] border-slate-300 mb-4 text-2xl">
              {modalInfo.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[16px] text-black">
              {modalInfo.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Button className="px-6 bg-red-900 hover:bg-red-700">
                Tentar novamente
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
