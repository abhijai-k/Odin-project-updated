const express = require('express');
const router = express.Router();

const messages = [
  { text: 'Hi there!', user: 'Amando', added: new Date() },
  { text: 'Hello World!', user: 'Charles', added: new Date() }
];

router.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages });
});

router.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

router.post('/new', (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

router.get('/message/:index', (req, res) => {
  const message = messages[req.params.index];
  if (!message) return res.status(404).send('Message not found');
  res.render('message', { title: 'Message Detail', message });
});

module.exports = router;
