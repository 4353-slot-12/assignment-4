import { beforeEach, expect, test, describe } from "@jest/globals";
import { verifyCallback, serializeUser, deserializeUser } from "../passport";
import UserService, { users } from "../services/user.js";

let params = {};

function done(err, user) {
    params.err = err;
    params.user = user;
}

describe("passport.js", () => {
    beforeEach(() => {
        users.length = 0;
        params = {};
    });

    test("verifyCallback user not found", () => {
        verifyCallback("username", "password", done);
        expect(params.err).toBe("User does not exist");
        expect(params.user).toBe(undefined);
    });

    test("verifyCallback password verify failed", () => {
        UserService.insertUser("username", "correctPass")
        verifyCallback("username", "wrongPass", done);
        expect(params.err).toBeNull();
        expect(params.user).toBe(false);
    });

    test("verifyCallback success", () => {
        UserService.insertUser("username", "correctPass")
        verifyCallback("username", "correctPass", done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(users[0]);
    });

    test("serializeUser success", () => {
        UserService.insertUser("username", "correctPass")
        serializeUser(users[0], done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(users[0].id);
    });

    test("deserializeUser success", () => {
        UserService.insertUser("username", "correctPass")
        deserializeUser(users[0].id, done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(users[0]);
    });

    test("deserializeUser failure", () => {
        const fakeId = UserService.generateUserId();
        deserializeUser(fakeId, done);
        expect(params.err).toBe("User not found");
        expect(params.user).toBe(undefined);
    });
});