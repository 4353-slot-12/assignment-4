import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from './services/user.js';


export function verifyCallback(username, password, done) {
  const user = UserService.findByUsername(username);
  if (user === undefined) return done("User does not exist");
  
  const hash = UserService.generateHash(password, user.salt);
  if (hash === user.hash) return done(null, user);
  return done(null, false, { message: "Bad password" });
};

export const serializeUser = (user, done) => done(null, user.id);

export function deserializeUser(userId, done) {
  const user = UserService.findById(userId);
  if (user === undefined)
    return done("User not found")
  return done(null, user);
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
export default passport;