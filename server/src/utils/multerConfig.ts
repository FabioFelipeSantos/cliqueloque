import multer from "fastify-multer";
import path from "path";
import crypto from "crypto";
import { ReceiptNotesCommands } from "../application/commands/receiptNotes.commands.ts";

const commands = new ReceiptNotesCommands();

export const multerConfig = multer({
  dest: path.resolve(process.cwd(), "temp", "uploads"),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: async (req, file, callback) => {
    const allowedMimes = [
      "application/pdf",
      "image/jpg",
      "image/jpeg",
      "image/png",
      "text/plain",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      const allSavedFiles = await commands.getAllFilesName();

      if (!allSavedFiles.includes(file.originalname)) {
        callback(null, true);
      } else {
        callback(
          new Error(`Já existe arquivos com o nome: ${file.originalname}`),
        );
      }
    } else {
      callback(new Error("Tipo de arquivo inválido"), false);
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(process.cwd(), "temp", "uploads"));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);

        const newFileName = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, newFileName);
      });
    },
  }),
});
