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

    static async findByUsername(username) {
        return await UserModel.findByUsername(username);
    }

    static async findById(id) {
        return await UserModel.findById(id);
    }

    static async insertUser(username, password) {
        const id = UserService.generateUserId();
        const salt = UserService.generateSalt();
        const hash = UserService.generateHash(password, salt);
        return await UserModel.create(id, username, hash, salt);
    }

    static verifyPassword(user, password) {
        const givenHash = UserService.generateHash(password, user.salt);
        if (givenHash === user.hash)
            return true;
        return false;
    }
}