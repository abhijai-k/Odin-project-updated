const express = require('express');
const db = require('../models/db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.query(`
    SELECT m.id, m.title, m.text, m.timestamp, u.first_name, u.last_name
    FROM messages m
    JOIN users u ON m.user_id = u.id
    ORDER BY m.timestamp DESC
  `);
  res.render('index', {
    messages: result.rows,
    user: req.user
  });
});

router.get('/new', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.render('new_message');
});

router.post('/new', async (req, res) => {
  const { title, text } = req.body;
  await db.query('INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)', [
    title, text, req.user.id
  ]);
  res.redirect('/');
});

router.delete('/delete/:id', async (req, res) => {
  if (req.user?.admin) {
    await db.query('DELETE FROM messages WHERE id=$1', [req.params.id]);
  }
  res.redirect('/');
});

module.exports = router;
