import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the file name
  },
});

// Initialize multer with storage options
const upload = multer({ storage });

export default upload;
