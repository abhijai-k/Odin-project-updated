const express = require('express');
const prisma = require('../models/prismaClient');
const { ensureAuth } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', ensureAuth, async (req, res) => {
  const folders = await prisma.folder.findMany({ where: { userId: req.user.id }, include: { files: true } });
  res.render('dashboard', { user: req.user, folders });
});

router.post('/create', ensureAuth, async (req, res) => {
  await prisma.folder.create({ data: { name: req.body.name, userId: req.user.id } });
  res.redirect('/folders');
});

router.post('/:id/share', ensureAuth, async (req, res) => {
  const expires = new Date(Date.now() + parseInt(req.body.duration) * 86400000);
  const id = uuidv4();
  await prisma.shareLink.create({ data: { id, folderId: parseInt(req.params.id), expiresAt: expires } });
  res.send(`Share link: ${req.protocol}://${req.get('host')}/share/${id}`);
});

router.get('/delete/:id', ensureAuth, async (req, res) => {
  await prisma.folder.delete({ where: { id: parseInt(req.params.id) } });
  res.redirect('/folders');
});

router.get('/view/:id', ensureAuth, async (req, res) => {
  const folder = await prisma.folder.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { files: true }
  });
  res.render('upload', { folder });
});

router.get('/share/:id', async (req, res) => {
  const share = await prisma.shareLink.findUnique({
    where: { id: req.params.id },
    include: { folder: { include: { files: true } } }
  });
  if (!share || new Date() > share.expiresAt) return res.status(404).send('Link expired or invalid.');
  res.render('shared', { folder: share.folder });
});

module.exports = router;
