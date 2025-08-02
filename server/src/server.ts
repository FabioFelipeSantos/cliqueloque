import fastify, { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";

import multer from "fastify-multer";

import { companyControllers } from "./interfaces/controllers/company.controller.ts";
import { contractControllers } from "./interfaces/controllers/contract.controller.ts";
import { contractInfoController } from "./interfaces/controllers/contractInfo.controller.ts";
import { receiptNotesController } from "./interfaces/controllers/receiptNotes.controller.ts";
import fastifyCors from "@fastify/cors";

const app: FastifyInstance = fastify();

app.register(fastifyCors, { origin: "*" });
app.register(multipart);
app.register(companyControllers, { prefix: "/companies" });
app.register(contractControllers, { prefix: "/contracts" });
app.register(contractInfoController, { prefix: "/contract-infos" });
app.register(receiptNotesController, { prefix: "/uploads" });

app.get("/", async (request, reply) => {
  reply.code(200).send({ message: "Welcome to the CliqueLoque Server" });
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server rodando em http://localhost:3333");
});
