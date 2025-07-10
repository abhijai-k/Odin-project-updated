import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import { query } from '../models/db.js';
const router = express.Router();


router.get('/signup', (req, res) => res.render('signup', { formData: {} }));

router.post(
  '/signup',
  [
    body('first_name').trim().notEmpty().withMessage('First name required'),
    body('last_name').trim().notEmpty().withMessage('Last name required'),
    body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password ≥ 6 chars'),
    body('confirmPassword').custom((val, { req }) => val === req.body.password).withMessage('Passwords must match'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.render('signup', { formData: req.body, errors: errors.array() });

    const { first_name, last_name, email, password, admin_checkbox } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
      await query(
        'INSERT INTO users (first_name, last_name, email, password, admin) VALUES ($1,$2,$3,$4,$5)',
        [first_name, last_name, email, hash, admin_checkbox === 'on']
      );
      req.flash('success', 'Sign‑up success! Please log in.');
      res.redirect('/login');
    } catch {
      req.flash('error', 'Email already registered');
      res.redirect('/signup');
    }
  }
);

router.get('/login', (req, res) => res.render('login'));

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);


router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logged out');
    res.redirect('/');
  });
});

export default router;
