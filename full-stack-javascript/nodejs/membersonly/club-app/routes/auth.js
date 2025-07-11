const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const db = require('../models/db');

const router = express.Router();


router.get('/signup', (req, res) => {
  res.render('signup', { errors: [], formData: {} });
});


router.post('/signup', [
  body('first_name').trim().notEmpty(),
  body('last_name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('confirmPassword').custom((value, { req }) => value === req.body.password)
], async (req, res) => {
  const errors = validationResult(req);
  const { first_name, last_name, email, password, adminCode } = req.body;
  if (!errors.isEmpty()) {
    return res.render('signup', { errors: errors.array(), formData: req.body });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const isAdmin = adminCode === process.env.ADMIN_CODE;
  await db.query(
    'INSERT INTO users (first_name, last_name, email, password, admin) VALUES ($1, $2, $3, $4, $5)',
    [first_name, last_name, email, hashedPassword, isAdmin]
  );
  res.redirect('/login');
});


router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);


router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});


router.get('/join', (req, res) => {
  res.render('join_club', { error: null });
});

router.post('/join', async (req, res) => {
  if (req.body.code === process.env.SECRET_CODE) {
    await db.query('UPDATE users SET membership_status=true WHERE id=$1', [req.user.id]);
    res.redirect('/');
  } else {
    res.render('join_club', { error: 'Incorrect code' });
  }
});

module.exports = router;
