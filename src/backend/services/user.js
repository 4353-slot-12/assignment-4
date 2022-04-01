import crypto from 'crypto';
import UserModel from '../models/user.js';

export const users = [];

export default class UserService {
    static  generateHash(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
    }

    static  generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    static  generateUserId() {
        return crypto.randomBytes(12).toString('hex');
    }

    static findByUsername(username) {
        return UserModel.findByUsername(username);
    }

    static findById(id) {
        return UserModel.findById(id);
    }

    static  insertUser(username, password) {
        const salt = UserService.generateSalt();
        const hash = UserService.generateHash(password, salt);
        return UserModel.create(username, hash, salt);
    }

    static  verifyPassword(user, password) {
        const givenHash = UserService.generateHash(password, user.salt);
        if (givenHash === user.hash)
            return true;
        return false;
    }
}