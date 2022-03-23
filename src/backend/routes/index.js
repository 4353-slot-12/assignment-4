import { Router } from 'express';
import { isAuth } from '../middleware/index.js'
import UserController from '../controllers/user.js';
import ProfileController from '../controllers/profile.js';
import QuoteController from '../controllers/quote.js';
import SampleController from '../controllers/sample.js';

const router = Router();

router.get('/auth', UserController.auth)
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/sample', SampleController.echo);


router.get('/logout', isAuth, UserController.logout);
router.post('/profile', isAuth, ProfileController.create);
router.put('/profile', isAuth, ProfileController.edit)
router.get('/profile', isAuth, ProfileController.get);
router.post('/quote', isAuth, QuoteController.create);
router.get('/quote', isAuth, QuoteController.history);

export default router;