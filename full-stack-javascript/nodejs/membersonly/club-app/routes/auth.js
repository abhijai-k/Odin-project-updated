const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../models/db');
const router = express.Router();


router.get('/signup', (req, res) => {
  res.render('signup', { errors: [], formData: {} });
});


router.post('/signup', [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password too short'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
], async (req, res) => {
  const errors = validationResult(req);
  const { first_name, last_name, email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.render('signup', { errors: errors.array(), formData: req.body });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, email, hashedPassword]
  );

  res.redirect('/login');
});

module.exports = router;
