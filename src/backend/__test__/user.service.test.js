import UserService from '../services/user.js';
import pool from '../db.js';

test('salt generates correctly', () => {
    const salt = UserService.generateSalt();
    expect(salt).toMatch(/^[0-9a-f]{32}$/);
});

test('user id generates correctly', () => {
    const userId = UserService.generateUserId();
    expect(userId).toMatch(/^[0-9a-f]{24}$/);
});

test('password hash generates correctly', () => {
    const salt = UserService.generateSalt();
    const password = 'keyboardCat';
    const hash = UserService.generateHash(password, salt);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
});


describe('verify password tests', () => {
    test('success', () => {
        const salt = UserService.generateSalt();
        const user = {
            id: UserService.generateUserId(),
            username: 'bob',
            hash: UserService.generateHash('keyboardCat', salt),
            salt: salt
        }

        const result = UserService.verifyPassword(user, 'keyboardCat');
        expect(result).toBe(true);
    })

    test('failure', () => {
        const salt = UserService.generateSalt();
        const user = {
            id: UserService.generateUserId(),
            username: 'bob',
            hash: UserService.generateHash('keyboardCat', salt),
            salt: salt
        }

        const result = UserService.verifyPassword(user, 'wrongPassword');
        expect(result).toBe(false);
    })
});

describe("async tests", () => {
    let client;
    let userId = null;

    beforeAll(async () => {
        client = await pool.connect();
    });

    beforeEach(async () => {
        if (userId === null) return;
        await client.query("DELETE FROM users WHERE id = $1", [userId]);
    })

    afterAll(async () => {
        if (userId !== null)
            await client.query("DELETE FROM users WHERE id = $1", [userId]);
        await client.release();
    })

    test("insert user test", async () => {
        const expectedUser = await UserService.insertUser("bob", "keyboardCat");
        const insertedUser = await UserService.findById(expectedUser.id);
        expect(insertedUser).toEqual(expectedUser);
        userId = insertedUser.id;
    })
    
    
    describe("find user by username", () => {
        test("by username, success", async () => {
            const insertedUser = await UserService.insertUser("bob", "keyboardCat");
            const foundUser = await UserService.findByUsername("bob");
            expect(foundUser.id).toBe(insertedUser.id);
            userId = insertedUser.id;
        })
    
        test("by username, failure", async () => {
            const user = await UserService.findByUsername("doesNotExist");
            expect(user).toBe(undefined);
            if (user?.id) userId = user.id;
            else userId = null;
        })
    
        test("by id, success", async () => {
            const insertedUser = await UserService.insertUser("bob", "keyboardCat");
            const foundUser = await UserService.findById(insertedUser.id);
            expect(foundUser.id).toBe(insertedUser.id);
            userId = insertedUser.id;
        })
    
        test("by id, failure", async () => {
            const user = await UserService.findById("doesNotExist");
            expect(user).toBe(undefined);
            if (user?.id) userId = user.id;
            else userId = null;
        })
    })
})
