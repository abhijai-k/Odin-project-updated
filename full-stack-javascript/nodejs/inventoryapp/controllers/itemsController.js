const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const { rows } = await db.query(`SELECT items.*, categories.name AS category_name FROM items LEFT JOIN categories ON items.category_id = categories.id`);
  res.render('items/index', { items: rows });
});