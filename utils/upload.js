import multer from "multer";
import dotenv from "dotenv";
import { GridFsStorage } from "multer-gridfs-storage";

dotenv.config();

const USER = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${USER}:${PASSWORD}@cluster0.djmj1ek.mongodb.net/Clone-Whatsapp`,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  file: (req, file) => {
    console.log(file, 'hello');
    const match = ["image/jpg", "image/jpeg", "image/png"];

    if(match.indexOf(file.mimetype) === -1 ) {
        return `${Date.now()}-file-${file.originalname}`
    }

    return {
        bucketname: "photos",
        filename: `${Date.now()}-file-${file.originalname}`
    }
  }
});

export default multer({ storage });