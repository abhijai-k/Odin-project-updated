import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { poolInstance } from '../models/db.js';

export default function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const { rows } = await poolInstance.query('SELECT * FROM users WHERE email=$1', [email]);
        const user = rows[0];
        if (!user) return done(null, false, { message: 'Email not registered' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Incorrect password' });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await poolInstance.query('SELECT * FROM users WHERE id=$1', [id]);
      done(null, rows[0]);
    } catch (err) {
      done(err);
    }
  });
}
