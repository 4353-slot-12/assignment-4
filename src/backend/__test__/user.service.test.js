import UserService, { users } from '../services/user.js';

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

test("insert user test", () => {
    UserService.insertUser("bob", "keyboardCat");
    expect(users).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ username: 'bob' }),
        ])
    )
})


describe("find user by username", () => {
    beforeEach(() => {
        // Clears users array.
        users.length = 0;
    })

    test("by username, success", () => {
        UserService.insertUser("bob", "keyboardCat");
        const user = UserService.findByUsername("bob");
        expect(user).toMatchObject({ username: "bob" });
    })

    test("by username, failure", () => {
        const user = UserService.findByUsername("doesNotExist");
        expect(user).toBe(undefined);
    })

    test("by id, success", () => {
        UserService.insertUser("bob", "keyboardCat");
        const user = UserService.findById(users[0].id);
        expect(user).toMatchObject({ username: "bob" });
    })

    test("by id, failure", () => {
        const user = UserService.findById("doesNotExist");
        expect(user).toBe(undefined);
    })
})