import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import configurePassport from './config/passport.js';
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

const app = express();
configurePassport(passport);

const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});


app.use('/', authRoutes);
app.use('/', messageRoutes);
app.use('/', indexRoutes);


app.use((req, res) => res.status(404).render('error', { message: 'Page not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));
