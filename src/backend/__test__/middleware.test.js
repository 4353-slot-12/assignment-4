import { isAuth, secureStaticFiles } from "../middleware/index.js";
import { beforeEach, expect, test, describe } from "@jest/globals";

const req = {
    url: null,
    auth: true,
    isAuthenticated() { return this.auth; }
}

const res = {
    redirectUrl: null,
    statusCode: null,
    redirect(url) { this.redirectUrl = url; },
    status(code) { this.statusCode = code; return this; }
}

let nextCalled = false;

function next() { nextCalled = true; }

describe("middleware tests", () => {
    beforeEach(() => {
        req.auth = true;
        res.redirectUrl = null;
        res.statusCode = null;
        nextCalled = false;
    });

    test("isAuth true", () => {
        isAuth(req, res, next);
        expect(nextCalled).toBe(true);
        expect(res.redirectUrl).toBeNull();
    });

    test("isAuth false", () => {
        req.auth = false;
        isAuth(req, res, next);
        expect(nextCalled).toBe(false);
        expect(res.redirectUrl).toBe('/login');
    });

    test("secureStaticFiles true", () => {
        req.url = 'http://localhost:8080/profile';
        secureStaticFiles(req, res, next);
        expect(res.statusCode).toBeNull();
        expect(res.redirectUrl).toBeNull();
        expect(nextCalled).toBe(true);
    });

    test("secureStaticFiles false", () => {
        req.url = 'http://localhost:8080/profile';
        req.auth = false;
        secureStaticFiles(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res.redirectUrl).toBe('/login');
        expect(nextCalled).toBe(false);
    });
})