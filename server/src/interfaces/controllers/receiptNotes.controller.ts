import { FastifyInstance, FastifyRequest } from "fastify";
import { ReceiptNotesCommands } from "../../application/commands/receiptNotes.commands.ts";
import { multerConfig } from "./../../utils/multerConfig.ts";
import { ReceiptNotesCreate } from "../../domain/value-objects/receiptNote.ts";
import fs from "fs";

export async function receiptNotesController(fastify: FastifyInstance) {
  const receiptNotesCommands = new ReceiptNotesCommands();

  fastify.post<{ Params: { id: string } }>(
    "/:id",
    { preHandler: multerConfig.single("file") },
    async (request, reply) => {
      const file = (request as any).file;

      if (!file) {
        return reply.status(200).send({ info: "Nenhum arquivo foi enviado" });
      }

      const { id } = request.params;
      const newFile = {
        fileName: file.originalname,
        savedFileName: file.filename,
        filePath: file.path,
        contractInfoId: id,
      };

      const arquivo = await receiptNotesCommands.create(newFile);

      reply
        .status(200)
        .send({ mensagem: "Arquivos enviados com sucesso!", arquivo });
    },
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const deletedFile = await receiptNotesCommands.delete(id);
      fs.rmSync(deletedFile.filePath);

      return reply
        .status(200)
        .send(`Arquivo ${deletedFile.fileName} apagado com sucesso`);
    } catch (error) {
      return reply.status(400).send(error);
    }
  });
}
