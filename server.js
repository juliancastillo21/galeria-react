import express from 'express';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    cb(null, extname);
  }
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let images = [];

app.get('/api/images', (req, res) => {
  res.json(images);
});

app.post('/api/images', upload.single('image'), (req, res) => {

  const newImage = {
    id: Date.now(),
    name: req.file.originalname,
    src: `/uploads/${req.file.filename}`,
    caption: req.body.caption || 'Sin descripción'
  };

  images.push(newImage);
  res.status(201).json(newImage);
});

app.delete('/api/images/:id', async (req) => {
  const id = parseInt(req.params.id);
  const imageIndex = images.findIndex(img => img.id === id);

  const image = images[imageIndex];
  await fs.unlink(path.join(__dirname, 'uploads', path.basename(image.src)));
  images.splice(imageIndex, 1);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});