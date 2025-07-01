require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const itemsRoutes = require('./controllers/itemsController');
const categoriesRoutes = require('./controllers/categoriesController');

app.use('/items', itemsRoutes);
app.use('/categories', categoriesRoutes);

app.get('/', (req, res) => res.redirect('/items'));

app.listen(3000, () => console.log('Server on http://localhost:3000'));
