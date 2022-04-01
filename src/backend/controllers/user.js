import passport from 'passport';
import UserService from '../services/user.js';

const wordyRegex = /^\w+$/i;

export default class UserController {
    static async login(req, res) {
        if (req.isAuthenticated())
            return res.redirect('/quote');
        const authenticateUser = passport.authenticate('local', {
            successReturnToOrRedirect: '/quote',
            failureRedirect: '/login'
        });
        authenticateUser(req, res, () => res.redirect('/login'));
    }

    static async logout(req, res) {
        req.logout();
        res.redirect('/');
    }

    static async register(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        
        if (!wordyRegex.test(username) || !wordyRegex.test(password) || password != confirmPassword) 
            return res.redirect('/register');
    
        if (UserService.findByUsername(username) == undefined) 
            UserService.insertUser(username, password);
    
        const authenticateUser = passport.authenticate('local');
        authenticateUser(req, res, () => res.redirect('/proto-profile'));
    }

    static auth(req, res) {
        res.status(200).send({ authenticated: req.isAuthenticated() });
    }
}