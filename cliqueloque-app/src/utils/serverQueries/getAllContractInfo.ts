export async function getAllContractInfo(
  contractId: string,
): Promise<IAllContractInfoServerResponse> {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  if (!baseURL)
    throw new Error("Defina o caminho base do server no arquivo .env.");

  const query: string = `${baseURL}/contract-infos/contract-info-plus-receipt-notes/${contractId}`;

  const response = await fetch(query);

  if (!response.ok)
    throw new Error(
      "Algum erro ocorreu com a requisição. Confira no banco se a empresa está cadastrada corretamente, e confira seu ID, não seu CNPJ.",
    );

  const result: IAllContractInfoServerResponse = await response.json();

  return result;
}
