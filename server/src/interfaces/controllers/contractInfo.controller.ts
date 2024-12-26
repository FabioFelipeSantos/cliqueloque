import { FastifyInstance } from "fastify";
import { ContractInfoCreate } from "../../domain/value-objects/contractInfo.ts";
import { ContractInfoCommands } from "../../application/commands/contractInfo.commands.ts";

export async function contractInfoController(fastify: FastifyInstance) {
  const contractInfoCommands = new ContractInfoCommands();

  fastify.post<{ Body: string }>("/", async (request, reply) => {
    try {
      const { emissionDate, finalDate, ...otherProps }: ContractInfoCreate =
        JSON.parse(request.body);

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
}
