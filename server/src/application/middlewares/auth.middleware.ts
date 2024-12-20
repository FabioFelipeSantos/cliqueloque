import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const apiCompanyCnpj = request.headers["companycnpj"];

  if (!apiCompanyCnpj) {
    reply.status(401).send({
      message:
        "Para criar ou consultar um contrato, o CNPJ da empresa precisa ser fornecido",
    });
  }
}
