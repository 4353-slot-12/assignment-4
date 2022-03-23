import passport from 'passport';
import ProfileService from '../services/profile_hand.js';
import {profiles} from '../services/profile_hand.js';
import UserService from '../services/user.js';

const wordyRegex = /^\w+$/i;

export function loginController(req, res) {
    if (req.isAuthenticated())
        return res.redirect('/quote');
    const authenticateUser = passport.authenticate('local', {
        successReturnToOrRedirect: '/quote',
        failureRedirect: '/login'
    });
    authenticateUser(req, res, () => res.redirect('/login'));
}

export function logoutController(req, res) {
    req.logout();
    res.redirect('/');
}

export function createProfileController(req, res) {
    const profile = {
        userId: req.user.id,
        ...req.body,
    };

    const invalidField = ProfileService.validateProfile(profile);
    if (invalidField) 
        return res.status(428).send({ message: `Invalid ${invalidField} field.`})

    ProfileService.addProfile(profile);
    return res.redirect('/quote');
}

export function editProfileController(req, res) {
    console.log("put hehe")
    const profile = {
        userId: req.user.id,
        ...req.body,
    }

    const invalidField = ProfileService.validateProfile(profile);
    if (invalidField) 
        return res.status(428).send({ message: `Invalid ${invalidField} field.`});
    
    console.log(profiles);
    ProfileService.updateProfile(profile);
    console.log(profiles);

    return res.redirect('/quote');
}

export function getProfileController(req, res) {
    const profile = ProfileService.findByUserId(req.user.id);
    if (profile === undefined)
        return res.status(404).redirect('/proto-profile');
    return res.status(302).send({data: profile});
}

export function registerController(req, res) {
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

export function authController(req, res) {
    res.status(200).send({ authenticated: req.isAuthenticated() });
}

export default { 
    loginController, 
    logoutController, 
    createProfileController, 
    editProfileController, 
    getProfileController, 
    registerController, 
    authController
}