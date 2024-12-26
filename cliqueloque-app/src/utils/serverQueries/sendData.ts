import { sendReceiptNotes } from "./sendReceiptNotes";

export type SendDataResponse = {
  contractInfoResponse: IContractInfoServerResponse;
  receiptNotesResponse: IReceiptNotesServerResponse[] | null;
};

export async function sendData(
  contractInfo: IContractInfoCreate,
  files: File[] | null,
): Promise<SendDataResponse> {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  if (!baseURL)
    throw new Error("Defina o caminho base do server no arquivo .env.");

  const queryPath: string = `${baseURL}/contract-infos/`;

  const response = await fetch(queryPath, {
    method: "POST",
    body: JSON.stringify(contractInfo),
  });

  if (!response.ok) {
    throw new Error("Algum erro aconteceu");
  }

  const contractInfoResponse: IContractInfoServerResponse =
    await response.json();

  if (!contractInfoResponse.contractInfo)
    throw new Error(
      "As informações do contrato não foram repassadas pelo banco de dados. Consulte as rotas configuradas e os retornos das mesmas.",
    );

  if (!files) return { contractInfoResponse, receiptNotesResponse: null };

  const receiptNotesResponse: IReceiptNotesServerResponse[] =
    await sendReceiptNotes(files, contractInfoResponse.contractInfo.id);

  return { contractInfoResponse, receiptNotesResponse };
}
