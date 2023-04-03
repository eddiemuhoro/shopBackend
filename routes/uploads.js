import express from 'express';
import prisma from '../script.js';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  

const router = express.Router();

//uploading powerpoint file
router.post('/upload', upload.single('file'), async (req, res) => {
    const { filename, mimetype, size } = req.file;
  
    const file = await prisma.file.create({
      data: {
        filename: filename,
        mimetype: mimetype,
        size: size,
        // other fields you want to save in your database
      },
    });
    
    res.json({ id: file.id, message: 'File uploaded successfully' });
  });

