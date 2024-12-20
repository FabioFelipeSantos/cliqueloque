import fastify, { FastifyInstance } from "fastify";

import { companyControllers } from "./interfaces/controllers/company.controller.ts";
import { contractControllers } from "./interfaces/controllers/contract.controller.ts";
import { contractInfoController } from "./interfaces/controllers/contractInfo.controller.ts";

const app: FastifyInstance = fastify();

app.register(companyControllers, { prefix: "/companies" });
app.register(contractControllers, { prefix: "/contracts" });
app.register(contractInfoController, { prefix: "/contract-infos" });

app.listen({ port: 3333 }).then(() => {
  console.log("Server rodando em http://localhost:3333");
});
