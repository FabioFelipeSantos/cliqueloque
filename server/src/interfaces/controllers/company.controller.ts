import { FastifyInstance } from "fastify";
import { CompanyCommands } from "../../application/commands/company.commands.ts";
import { CompanyCreate } from "../../domain/entities/company.ts";

export async function companyControllers(fastify: FastifyInstance) {
  const companyCommands = new CompanyCommands();

  fastify.post<{ Body: CompanyCreate }>("/", async (request, reply) => {
    const { cnpj, socialName, fantasyName } = request.body;

    try {
      const createdCompany = await companyCommands.create({
        cnpj,
        socialName,
        fantasyName,
      });

      return reply.code(201).send({
        code: 201,
        status: "success",
        mensagem: "Empresa cadastrada com sucesso",
        empresa: createdCompany,
      });
    } catch (error) {
      reply.code(400).send({
        code: 400,
        status: "failed",
        mensagem: "Confira os dados da empresa a ser cadastrada",
        erro: error,
      });
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;

    try {
      const company = await companyCommands.findCompanyById(id);

      return reply.code(200).send({
        code: 200,
        status: "success",
        mensagem: `Empresa ${company.socialName} de CNPJ: ${company.cnpj}`,
        empresa: company,
        erro: "",
      });
    } catch (error) {
      reply.code(400).send({
        code: 400,
        status: "failed",
        mensagem: "Nenhuma empresa cadastrada com este cnpj",
        erro: error,
      });
    }
  });

  fastify.get("/", async (request, reply) => {
    try {
      const companies = await companyCommands.getAllCompanies();

      return reply.code(200).send({
        code: 200,
        status: "success",
        mensagem: "Empresa(s) encontradas com sucesso",
        empresas: companies,
        erro: "",
      });
    } catch (error) {
      reply.code(204).send({
        code: 204,
        status: "success",
        mensagem: "Nenhuma empresa cadastrada",
        erro: error,
      });
    }
  });

  fastify.get<{ Params: { cnpj: string } }>(
    "/cnpj/:cnpj",
    async (request, reply) => {
      const { cnpj } = request.params;

      try {
        const result = await companyCommands.findCompanyByCnpj(cnpj);

        return reply.send(result);
      } catch (error) {
        return reply.code(400).send({ erro: error });
      }
    },
  );
}
