const express = require('express');
const multer = require('multer');
const prisma = require('../models/prismaClient');
const { ensureAuth } = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload/:folderId', ensureAuth, upload.single('file'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, { folder: 'filemanager' });
  await prisma.file.create({
    data: {
      name: req.file.originalname,
      url: result.secure_url,
      size: req.file.size,
      userId: req.user.id,
      folderId: parseInt(req.params.folderId)
    }
  });
  fs.unlinkSync(req.file.path);
  res.redirect('/folders/view/' + req.params.folderId);
});

router.get('/details/:id', ensureAuth, async (req, res) => {
  const file = await prisma.file.findUnique({ where: { id: parseInt(req.params.id) } });
  res.send(file);
});

module.exports = router;
