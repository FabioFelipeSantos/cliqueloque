import { FastifyInstance } from "fastify";
import { ReceiptNotesCommands } from "../../application/commands/receiptNotes.commands.ts";
import uploadConfig from "../../application/middlewares/upload.middleware.ts";

export async function receiptNotesController(fastify: FastifyInstance) {
  const receiptNotesCommands = new ReceiptNotesCommands();
  const { upload } = uploadConfig({
    allowedMimeTypes: ["application/pdf", "image/png", "image/jpeg"],
  });

  fastify.post(
    "/",
    { preHandler: upload.single("file") },
    async (request, reply) => {
      const file = (request as any).file;

      if (!file) {
        return reply.status(400).send({ error: "Nenhum arquivo enviado" });
      }
    },
  );
}
