import { Router } from 'express';
import UserService from '../services/user.js';
import passport from 'passport';
import { isAuth } from '../middleware/index.js'
import SampleService from '../services/sample.js';
import { 
    loginController, 
    logoutController, 
    createProfileController, 
    editProfileController, 
    getProfileController, 
    registerController, 
    authController
} from '../controllers/index.js';

const router = Router();

const wordyRegex = /^\w+$/i;

router.get('/auth', authController)
router.post('/login', loginController);
router.get('/logout', isAuth, logoutController);
router.post('/register', registerController);
router.post('/profile', isAuth, createProfileController);
router.put('/profile', isAuth, editProfileController)
router.get('/profile', isAuth, getProfileController);
router.post('/sample', SampleService.echoMessage)

export default router;