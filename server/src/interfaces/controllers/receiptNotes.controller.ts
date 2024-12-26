import { FastifyInstance, FastifyRequest } from "fastify";
import { ReceiptNotesCommands } from "../../application/commands/receiptNotes.commands.ts";
import { multerConfig } from "./../../utils/multerConfig.ts";
import { ReceiptNotesCreate } from "../../domain/value-objects/receiptNote.ts";
import fs from "fs";

export async function receiptNotesController(fastify: FastifyInstance) {
  const receiptNotesCommands = new ReceiptNotesCommands();

  fastify.post<{ Params: { contractInfoId: string } }>(
    "/:contractInfoId",
    { preHandler: multerConfig.single("file") },
    async (request, reply) => {
      const file = (request as any).file;

      if (!file) {
        return reply.status(200).send({ info: "Nenhum arquivo foi enviado" });
      }

      const { contractInfoId } = request.params;
      const newFile = {
        fileName: file.originalname,
        savedFileName: file.filename,
        filePath: file.path,
        contractInfoId: contractInfoId,
      };

      const arquivo = await receiptNotesCommands.create(newFile);

      return reply.code(200).send({
        code: 200,
        status: "success",
        message: "Arquivo salvo com sucesso",
        file: newFile,
        error: "",
      });
    },
  );

  fastify.delete<{ Params: { receiptNoteId: string } }>(
    "/:receiptNoteId",
    async (request, reply) => {
      try {
        const { receiptNoteId } = request.params;
        const deletedFile = await receiptNotesCommands.delete(receiptNoteId);
        fs.rmSync(deletedFile.filePath);

        return reply
          .status(200)
          .send(`Arquivo ${deletedFile.fileName} apagado com sucesso`);
      } catch (error) {
        return reply.status(400).send(error);
      }
    },
  );
}
