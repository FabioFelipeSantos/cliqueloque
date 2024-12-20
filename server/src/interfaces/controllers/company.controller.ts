import { FastifyInstance } from "fastify";
import { CompanyCommands } from "../../application/commands/company.commands.ts";
import { CompanyCreate } from "../../domain/entities/company.ts";

export async function companyControllers(fastify: FastifyInstance) {
  const companyCommands = new CompanyCommands();

  fastify.post<{ Body: CompanyCreate }>("/", async (request, reply) => {
    const { cnpj, socialName, fantasyName } = request.body;

    try {
      const data = await companyCommands.create({
        cnpj,
        socialName,
        fantasyName,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get<{ Params: { id: string } }>(
    "/company/:id",
    async (request, reply) => {
      const { id } = request.params;
      console.log(id);

      try {
        const company = await companyCommands.findCompanyById(id);

        return reply.send(company);
      } catch (error) {
        reply.send(error);
      }
    },
  );
}
