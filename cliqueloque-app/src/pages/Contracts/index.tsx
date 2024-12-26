import { useNavigate, useParams } from "react-router";
import { useCompany } from "@/components/contexts/useCompany";
import { useEffect, useState } from "react";
import { getUserContracts } from "../../utils/serverQueries/getUserContracts";
import {
  ButtonsContainer,
  ContractsContainer,
  LayoutContainer,
  TableContainer,
  WithoutContractsInfo,
} from "./styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import PulseSpinner from "@/components/PulseSpinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ModalInfo = {
  message: string;
};

export default function Contracts() {
  const navigate = useNavigate();
  const { company } = useCompany();
  const { companyId } = useParams<{ companyId: string }>() as {
    companyId: string;
  };
  const [contracts, setContracts] = useState<IContract[] | null>(null);
  const [isContractsLoaded, setIsContractsLoaded] = useState(false);
  const [selectedInputs, setSelectedInputs] = useState<IContract[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ message: "" });

  useEffect(() => {
    setIsContractsLoaded(false);
    const getContracts = async () => {
      const contractsResult = await getUserContracts(companyId);

      setContracts(contractsResult.contract);
    };

    getContracts();
    setIsContractsLoaded(true);
  }, [companyId]);

  function handlingChangeInput(checked: CheckedState, contract: IContract) {
    if (checked) {
      setSelectedInputs(inputs => [...inputs, contract]);
    } else {
      setSelectedInputs(inputs =>
        inputs.filter(input => input.id !== contract.id),
      );
    }
  }

  function handlingNextButton() {
    if (selectedInputs.length === 0) {
      setModalInfo({ message: "Selecione um contrato para prosseguir." });
      setOpenModal(true);
      return;
    } else if (selectedInputs.length > 1) {
      setModalInfo({ message: "Somente um contrato pode ser selecionado." });
      setOpenModal(true);
      return;
    }

    setOpenModal(false);
    navigate(`/contract/${selectedInputs[0].id}`);
  }

  function renderingInfo() {
    if (!isContractsLoaded) {
      return (
        <WithoutContractsInfo>
          <PulseSpinner />;
        </WithoutContractsInfo>
      );
    } else if (!contracts) {
      return (
        <WithoutContractsInfo>
          <p>
            Ainda não há contratos cadastrados para esta empresa. Por favor,
            entre em contato conosco para que possamos auxiliá-lo na obtenção de
            novos contratos ou no cadastro de eventuais contratos realizados.
          </p>
        </WithoutContractsInfo>
      );
    } else {
      return (
        <ContractsContainer>
          <TableContainer>
            <Table className="text-lg text-center">
              <TableHeader>
                <TableRow className="bg-[#74736e] hover:bg-[#74736e] rounded-md text-xl">
                  <TableHead></TableHead>
                  <TableHead className="text-white">Nome do Contrato</TableHead>
                  <TableHead className="text-center text-white">
                    Código do Contrato
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Retenção Técnica
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Detalhes
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {contracts.map(
                  (contract, index) =>
                    !contract.hasInfo && (
                      <TableRow
                        key={contract.id}
                        className={`${index % 2 === 0 ? "bg-[#eeea]" : "bg-[#ddda]"} hover:bg-[#dde]`}
                      >
                        <TableCell>
                          <div className="flex items-center justify-center mx-2">
                            <Checkbox
                              className="size-6"
                              onCheckedChange={checked =>
                                handlingChangeInput(checked, contract)
                              }
                            />
                          </div>
                        </TableCell>

                        <TableCell className="w-4/12 text-left">
                          {contract.title}
                        </TableCell>

                        <TableCell>{contract.code}</TableCell>

                        <TableCell className="mx-[auto] flex justify-center">
                          <div className="bg-[#2c70b9] w-9/12 text-white font-bold border-2 border-[#2c70b9]">
                            {`${(contract.withholding * 100).toFixed(2).replace(/(.+)\.(.*)/, "$1,$2")}%`}
                          </div>
                        </TableCell>

                        <TableCell>
                          <Button className="bg-[#2c70b9] hover:bg-[#2288ff] px-3">
                            <Search />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ),
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <ButtonsContainer>
            <Button
              onClick={() => navigate("/")}
              className="bg-[#ffaa00] hover:bg-[#ee9900] text-xl py-5 font-bold w-[48%]"
            >
              Anterior
            </Button>
            <Button
              onClick={handlingNextButton}
              className="bg-[#008b47] hover:bg-[#007a47] text-xl py-5 font-bold w-[48%]"
            >
              Próximo
            </Button>
          </ButtonsContainer>
        </ContractsContainer>
      );
    }
  }

  return (
    <LayoutContainer>
      <div>
        <Header subtitle="Contratos Vinculados" company={company} />
        {renderingInfo()}
        <Footer />
      </div>

      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Contratos Selecionados</AlertDialogTitle>
            <AlertDialogDescription className="text-[16px] text-black">
              {modalInfo.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700">
              <Button className="px-6 bg-yellow-600 hover:bg-yellow-700">
                Tentar novamente
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LayoutContainer>
  );
}
