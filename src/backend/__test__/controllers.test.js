import { beforeEach, expect, test, describe } from "@jest/globals";
import ProfileService, { profiles } from "../services/profile.js";
import UserController from "../controllers/user.js";
import ProfileController from "../controllers/profile.js";
import QuoteController from "../controllers/quote.js";
import SampleController from "../controllers/sample.js";
import QuoteService, { quotes } from "../services/quote.js";


const fakeUser = {
    user: {
        id: 'abc123',
        hash: 'bcd234',
        salt: 'cde345',
        username: 'bob'
    },
    body: {
        name: 'bob sagat',
        address1: '123 apple st',
        address2: 'po box 1234',
        city: 'hobokin',
        state: 'NJ',
        zip: '12345'
    },
}

let req = {
    url: null,
    auth: true,
    logoutCalled: false,
    isAuthenticated() { return this.auth; },
    logout() { this.logoutCalled = true },
    ...fakeUser,
}

const res = {
    redirectUrl: null,
    statusCode: null,
    sent: null,
    redirect(url) { this.redirectUrl = url; this.statusCode = 304; },
    status(code) { this.statusCode = code; return this; },
    send(data) { this.sent = data; }
}

describe('controllers', () => {
    beforeEach(() => {
        profiles.length = 0;
        req.body.name = 'bob sagat';
        req.auth = true;
        req.url = null;
        req.logoutCalled = false;


        res.redirectUrl = null;
        res.statusCode = null;
        res.sent = null;
    });

    test('sample controller test', () => {
        const res = {
            statusCode: '',
            body: null,
            status: function(code) { 
                this.statusCode = code;
                return this; 
            },
            send: function(obj) { 
                this.body = obj; 
                return this; 
            },
        };
    
        const req = {
            body: {
                message: 'Hello from Jest!'
            }
        };
    
        SampleController.echo(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ echo: req.body.message });
    });

    test('logout', () => {
        const req = {
            logoutCalled: false,
            logout() { this.logoutCalled = true },
        }
        const res = {
            redirectUrl: null,
            redirect(url) { this.redirectUrl = url },
        };
        UserController.logout(req, res);
        expect(req.logoutCalled).toBe(true);
        expect(res.redirectUrl).toBe('/');
    });

    test('login auth', () => {
        UserController.login(req, res);
        expect(res.redirectUrl).toBe('/quote');
        expect(res.statusCode).toBe(304);
    })

    test('create profile', () => {
        ProfileController.create(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe('/quote');
    });

    test('create invalid profile', () => {
        req.body.name = 'b@b 5@6@t';
        ProfileController.create(req, res);
        expect(res.statusCode).toBe(428);
        expect(res.sent).toEqual({ message: "Invalid name field."});
        expect(res.redirectUrl).toBeNull();
    });

    test('edit profile', () => {
        const data = { ...req.body, userId: req.user.id };
        ProfileService.addProfile(data);

        ProfileController.edit(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe('/quote');
    });

    test('edit invalid profile', () => {
        const data = { ...req.body, userId: req.user.id };
        ProfileService.addProfile(data);

        req.body.name = 'b@b 5@6@t';
        ProfileController.edit(req, res);
        expect(res.statusCode).toBe(428);
        expect(res.sent).toEqual({ message: "Invalid name field."});
        expect(res.redirectUrl).toBeNull();
    });

    test('get profile', () => {
        const data = { ...req.body, userId: req.user.id };
        ProfileService.addProfile(data);
        ProfileController.get(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.sent).toEqual({ data })
    });

    test('get profile no exist', () => {
        ProfileController.get(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe("/proto-profile");
        expect(res.sent).toBeNull();
    });

    test('quote create', () => {
        req.body = {
            gallonsRequested: "5",
            deliveryDate: "2022-03-13"
        };
        ProfileService.addProfile(fakeUser.body);
        QuoteController.create(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.sent).toHaveProperty("gallonsRequested");
        expect(res.sent).toHaveProperty("deliveryDate");
        expect(res.sent).toHaveProperty("deliveryAddress");
        expect(res.sent).toHaveProperty("timeStamp");
        expect(res.sent).toHaveProperty("suggestedPrice");
        expect(res.sent).toHaveProperty("totalPrice");
        expect(res.sent).not.toHaveProperty("userId");
    })

    test('quote create invalid', () => {
        req.body = {
            gallonsRequested: "5!",
            deliveryDate: "202#@$3"
        };
        ProfileService.addProfile(fakeUser.body);
        QuoteController.create(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe('/quote');
    })

    test('quote history', () => {
        const data = {
            gallonsRequested: 5,
            deliveryDate: "2022-03-13"
        };
        QuoteService.insert(fakeUser.user.id, data, fakeUser.body);
        QuoteController.history(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.sent).toEqual(quotes.get(fakeUser.user.id));
    })
});