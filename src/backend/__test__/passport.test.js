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

    test("verifyCallback user not found", async () => {
        await verifyCallback("username", "password", done);
        expect(params.err).toBe("User does not exist");
        expect(params.user).toBe(undefined);
    });

    test("verifyCallback password verify failed", async () => {
        await UserService.insertUser("username", "correctPass")
        await verifyCallback("username", "wrongPass", done);
        expect(params.err).toBeNull();
        expect(params.user).toBe(false);
    });

    test("verifyCallback success", async () => {
        await UserService.insertUser("username", "correctPass")
        await verifyCallback("username", "correctPass", done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(users[0]);
    });

    test("serializeUser success", async () => {
        await UserService.insertUser("username", "correctPass")
        serializeUser(users[0], done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(users[0].id);
    });

    test("deserializeUser success", async () => {
        await UserService.insertUser("username", "correctPass")
        await deserializeUser(users[0].id, done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(users[0]);
    });

    test("deserializeUser failure", async () => {
        const fakeId = UserService.generateUserId();
        await deserializeUser(fakeId, done);
        expect(params.err).toBe("User not found");
        expect(params.user).toBe(undefined);
    });
});