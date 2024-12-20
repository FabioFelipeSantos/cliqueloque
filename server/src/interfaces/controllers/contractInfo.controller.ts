import { FastifyInstance } from "fastify";
import { ContractInfoCreate } from "../../domain/value-objects/contractInfo.ts";
import { ContractInfoCommands } from "../../application/commands/contractInfo.commands.ts";

export async function contractInfoController(fastify: FastifyInstance) {
  const contractInfoCommands = new ContractInfoCommands();

  fastify.post<{ Body: ContractInfoCreate }>("/", async (request, reply) => {
    try {
      const { emissionDate, finalDate, ...otherProps } = request.body;

      const data = await contractInfoCommands.create({
        emissionDate: new Date(emissionDate),
        finalDate: new Date(finalDate),
        ...otherProps,
      });

      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
