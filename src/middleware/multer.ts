import multer from "multer";

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, `${__dirname}\\..\\..\\multer-uploads`);
  },
  filename: (request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const multerFileUpload = multer({
  storage,
});
