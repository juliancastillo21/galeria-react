import express from 'express';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Validar que sea una imagen
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Solo se permiten archivos de imagen!'), false);
        }
        cb(null, true);
    }
});

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configurar CORS manualmente
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Almacenamiento de metadatos de imágenes
let images = [];

// Endpoints
app.get('/api/images', async (req, res) => {
    try {
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las imágenes', error: error.message });
    }
});

app.post('/api/images', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen' });
        }

        const newImage = {
            src: `/uploads/${req.file.filename}`,
            width: 800,
            height: 600,
            caption: req.body.caption || 'Nueva imagen',
            isSelected: false,
            thumbnailWidth: 320,
            thumbnailHeight: 240,
        };

        images.push(newImage);
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar la imagen', error: error.message });
    }
});

app.delete('/api/images/:index', async (req, res) => {
    try {
        const index = parseInt(req.params.index);
        
        if (index < 0 || index >= images.length) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        // Eliminar el archivo físico
        const image = images[index];
        const filePath = path.join(__dirname, image.src);
        await fs.unlink(filePath);

        // Eliminar el registro
        const deletedImage = images.splice(index, 1)[0];
        res.json(deletedImage);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la imagen', error: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});