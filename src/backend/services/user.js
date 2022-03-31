import crypto from 'crypto';

export const users = [];

export default class UserService {
    static async generateHash(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
    }

    static async generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    static async generateUserId() {
        return crypto.randomBytes(12).toString('hex');
    }

    static async findByUsername(username) {
        return users.find(user => user.username === username);
    }

    static async findById(id) {
        return users.find(user => user.id === id);
    }

    static async insertUser(username, password) {
        const salt = UserService.generateSalt();
        const newUser = {
            id: UserService.generateUserId(),
            username: username,
            hash: UserService.generateHash(password, salt),
            salt: salt,
        };
        users.push(newUser);
    }

    static async verifyPassword(user, password) {
        const givenHash = UserService.generateHash(password, user.salt);
        if (givenHash === user.hash)
            return true;
        return false;
    }
}