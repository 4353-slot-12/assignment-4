import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from './passport.js'
import router from './routes/index.js';
import { secureStaticFiles } from './middleware/index.js';
import methodOverride from 'method-override';

dotenv.config();
const app = express();
const baseDir = path.join(process.cwd(), 'src');

app.use(express.json());
app.use(cors());

app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard-cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3,
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status'));

app.use('/api', router);

app.use(secureStaticFiles);
app.use(express.static(path.join(baseDir, 'frontend'), {
    extensions: ['html']
}));

export default app;