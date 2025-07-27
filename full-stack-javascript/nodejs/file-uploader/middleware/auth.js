const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const prisma = require('../models/prismaClient');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({ data: { username: req.body.username, password: hashed } });
  res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', { successRedirect: '/folders', failureRedirect: '/login' }));

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/login'));
});

module.exports = router;
