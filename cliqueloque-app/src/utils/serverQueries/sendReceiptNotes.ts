export async function sendReceiptNotes(
  files: File[],
  contractInfoId: string,
): Promise<IReceiptNotesServerResponse[]> {
  const responses: IReceiptNotesServerResponse[] = [];

  for await (const file of files) {
    console.log(file);

    const formData = new FormData();

    formData.append("file", file);
    console.log(formData);

    const result = await makeTheRequest(formData, contractInfoId);

    responses.push(result);
  }

  return responses;
}

async function makeTheRequest(formData: FormData, contractInfoId: string) {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  if (!baseURL)
    throw new Error("Defina o caminho base do server no arquivo .env.");

  const queryPath: string = `${baseURL}/uploads/${contractInfoId}`;

  const response = await fetch(queryPath, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      "Algum erro aconteceu. Consulte mais informações na resposta do servidor",
    );
  }

  const result: IReceiptNotesServerResponse = await response.json();

  return result;
}
