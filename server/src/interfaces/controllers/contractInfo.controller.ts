import { FastifyInstance } from "fastify";
import { ContractInfoCreate } from "../../domain/value-objects/contractInfo.ts";
import { ContractInfoCommands } from "../../application/commands/contractInfo.commands.ts";
import { ReceiptNotesCommands } from "../../application/commands/receiptNotes.commands.ts";
import { ReceiptNotes } from "../../domain/value-objects/receiptNote.ts";

export async function contractInfoController(fastify: FastifyInstance) {
  const contractInfoCommands = new ContractInfoCommands();
  const receiptNotesCommands = new ReceiptNotesCommands();

  fastify.post<{ Body: ContractInfoCreate }>("/", async (request, reply) => {
    try {
      const { emissionDate, finalDate, ...otherProps } = request.body;

      const contractInfo = await contractInfoCommands.create({
        emissionDate: new Date(emissionDate),
        finalDate: new Date(finalDate),
        ...otherProps,
      });

      return reply.code(200).send({
        code: 200,
        status: "success",
        message: "Informações de contrato adicionados com sucesso",
        contractInfo,
        error: "",
      });
    } catch (error) {
      console.log(error);
      return reply.code(400).send({
        code: 400,
        status: "failed",
        message: "A empresa não foi encontrada na base de dados",
        company: null,
        error,
      });
    }
  });

  fastify.get<{ Params: { contractInfoId: string } }>(
    "/just-contract/:contractInfoId",
    async (request, reply) => {
      try {
        const { contractInfoId } = request.params;

        const contractInfo =
          contractInfoCommands.findContractInfoByContractId(contractInfoId);

        return reply.code(200).send({
          code: 200,
          status: "success",
          message: "Informações de contrato encontrados com sucesso",
          contractInfo,
          error: "",
        });
      } catch (error) {
        return reply.code(400).send({
          code: 400,
          status: "failed",
          message: "Informações de contrato não encontradas.",
          contractInfo: null,
          error,
        });
      }
    },
  );

  fastify.get<{ Params: { contractId: string } }>(
    "/contract-info-plus-receipt-notes/:contractId",
    async (request, reply) => {
      try {
        const { contractId } = request.params;

        const contractInfo =
          await contractInfoCommands.findContractInfoByContractId(contractId);

        let receiptNotes: ReceiptNotes[] | null = null;

        if (contractInfo) {
          receiptNotes = await receiptNotesCommands.getReceiptByContract(
            contractInfo.id,
          );
        }

        const allContractInfo = { contractInfo, receiptNotes };

        return reply.code(200).send({
          code: 200,
          status: "success",
          message: "Informações de contrato encontrados com sucesso",
          allContractInfo,
          error: "",
        });
      } catch (error) {
        return reply.code(400).send({
          code: 400,
          status: "failed",
          message: "Informações de contrato não encontradas.",
          contractInfo: null,
          error,
        });
      }
    },
  );
}
