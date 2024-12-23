export async function login(cnpj: string): Promise<ICompanyServerResponse> {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  if (!baseURL)
    throw new Error("Defina o caminho base do server no arquivo .env.");

  const query: string = `${baseURL}/companies/cnpj/${cnpj}`;

  const response = await fetch(query);

  if (!response.ok)
    throw new Error(
      "CNPJ inválido. Confira os seus dados e certifique-se de que sua empresa está cadastrada.",
    );

  const result: ICompanyServerResponse = await response.json();

  return result;
}
