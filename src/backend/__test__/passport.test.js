import { beforeEach, expect, test, describe } from "@jest/globals";
import { verifyCallback, serializeUser, deserializeUser } from "../passport";
import UserService from "../services/user.js";
import pool from '../db.js';

let params = {};

function done(err, user) {
    params.err = err;
    params.user = user;
}

describe("passport.js", () => {
    let userId = null;
    beforeEach(async () => {
        params = {};
        if (userId == null) return;
        await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    });

    test("verifyCallback user not found", async () => {
        await verifyCallback("username", "password", done);
        expect(params.err).toBe("User does not exist");
        expect(params.user).toBe(undefined);
        userId = null;
    });

    test("verifyCallback password verify failed", async () => {
        const user = await UserService.insertUser("username", "correctPass")
        await verifyCallback("username", "wrongPass", done);
        expect(params.err).toBeNull();
        expect(params.user).toBe(false);
        userId = user.id;
    });

    test("verifyCallback success", async () => {
        const user = await UserService.insertUser("username", "correctPass")
        await verifyCallback("username", "correctPass", done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(user);
        userId = user.id;
    });

    test("serializeUser success", async () => {
        const user = await UserService.insertUser("username", "correctPass")
        serializeUser(user, done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(user.id);
        userId = user.id;

    });

    test("deserializeUser success", async () => {
        const user = await UserService.insertUser("username", "correctPass")
        await deserializeUser(user.id, done);
        expect(params.err).toBeNull();
        expect(params.user).toEqual(user);
        userId = user.id;
    });

    test("deserializeUser failure", async () => {
        const fakeId = UserService.generateUserId();
        await deserializeUser(fakeId, done);
        expect(params.err).toBe("User not found");
        expect(params.user).toBe(undefined);
        userId = null;
    });
});