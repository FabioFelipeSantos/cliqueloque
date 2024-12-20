import multer from "fastify-multer";
import path from "path";

interface UploadConfigOptions {
  storagePath?: string;
  allowedMimeTypes?: string[];
}

const uploadConfig = ({
  allowedMimeTypes = ["application/pdf"],
  storagePath = path.join(__dirname, "../uploads"),
}: UploadConfigOptions) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storagePath);
    },
    filename: (req, file, cb) => {
      const date = new Date();
      const namePosfix = [
        date.getFullYear(),
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1,
        date.getDate(),
      ].join("_");

      cb(null, `${file.originalname}_${namePosfix}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
          new Error(`Tipo de arquivo não permitido: ${file.mimetype}`),
          false,
        );
      }
      cb(null, true);
    },
  });

  return { upload };
};

export default uploadConfig;
