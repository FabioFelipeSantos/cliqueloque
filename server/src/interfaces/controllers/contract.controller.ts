import { FastifyInstance } from "fastify";
import { ContractCommands } from "../../application/commands/contract.commands.ts";
import { ContractCreate } from "../../domain/entities/contract.ts";

export async function contractControllers(fastify: FastifyInstance) {
  const contractCommands = new ContractCommands();

  fastify.post<{ Body: ContractCreate }>("/", async (request, reply) => {
    const { code, title, withholding, companyId } = request.body;

    try {
      const createdContract = await contractCommands.create({
        code,
        title,
        withholding,
        companyId,
      });

      return reply.code(200).send({
        code: 200,
        status: "success",
        mensagem: "Contrato criado com sucesso",
        contrato: createdContract,
        erro: "",
      });
    } catch (error) {
      return reply.code(400).send({
        code: 400,
        status: "failed",
        mensagem: `Entre ou confira os dados: ${Object.entries(request.body)
          .filter(item => !item[1])
          .map(item => item[1])
          .join(", ")}`,
        erro: error,
      });
    }
  });

  fastify.get<{ Params: { companyId: string } }>(
    "/:companyId",
    async (request, reply) => {
      try {
        const { companyId } = request.params;

        const contracts =
          await contractCommands.findAllContractsByCompany(companyId);

        reply.code(200).send({
          code: 200,
          status: "success",
          message: "Contratos encontrados com sucesso",
          contract: contracts,
          erro: "",
        });
      } catch (error) {
        reply.code(400).send({
          code: 400,
          status: "failed",
          message:
            "Erro ao tentar buscar os contratos. Leia o campo erro para mais detalhes",
          contract: null,
          error,
        });
      }
    },
  );
}
