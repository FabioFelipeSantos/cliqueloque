import { FastifyInstance } from "fastify";
import { ContractCommands } from "../../application/commands/contract.commands.ts";
import { ContractCreate } from "../../domain/entities/contract.ts";
import { authMiddleware } from "../../application/middlewares/auth.middleware.ts";

export async function contractControllers(fastify: FastifyInstance) {
  const contractCommands = new ContractCommands();
  fastify.addHook("preHandler", authMiddleware);

  fastify.post<{ Body: ContractCreate; Headers: { companyCnpj: string } }>(
    "/",
    async (request, reply) => {
      const { code, title, withholding } = request.body;
      const companyCnpj = request.headers.companycnpj;

      try {
        const data = await contractCommands.create({
          code,
          title,
          withholding,
          companyCnpj,
        });

        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    },
  );

  fastify.get("/", async (request, reply) => {
    try {
      const companyCnpj = request.headers["companyCnpj"] as string;

      const contracts =
        await contractCommands.findAllContractsByCompany(companyCnpj);

      reply.send(contracts);
    } catch (error) {
      reply.send(error);
    }
  });
}
