import { time } from "console";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();

app.post("/companies", (request, reply) => {
  const createCompanySchema = z.object({});
  return request.body;
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server rodando em http://localhost:3333");
});
