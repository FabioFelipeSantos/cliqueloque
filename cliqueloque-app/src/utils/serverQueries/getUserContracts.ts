export async function getUserContracts(
  companyId: string,
): Promise<IContractServerResponse> {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  if (!baseURL)
    throw new Error("Defina o caminho base do server no arquivo .env.");

  const query: string = `${baseURL}/contracts/${companyId}`;

  const response = await fetch(query);

  if (!response.ok)
    throw new Error(
      "Algum erro ocorreu com a requisição. Confira no banco se a empresa está cadastrada corretamente, e confira seu ID, não seu CNPJ.",
    );

  const result: IContractServerResponse = await response.json();

  return result;
}
