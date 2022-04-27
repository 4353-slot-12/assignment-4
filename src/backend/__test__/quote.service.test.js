import { beforeEach, expect, test, describe } from "@jest/globals";
import QuoteService from '../services/quote.js';
import { Profile } from '../services/profile.js';
import pool from '../db.js';

const dollarsRegex = /^\$[\d,]+.\d{2}$/;


describe("quote service tests", () => {
    let userId = null;

    beforeEach(async () => {
        if (userId == null) return;
        await pool.query('DELETE FROM fuelquote WHERE userid = $1', [userId]);
    });

    test("data validation", () => {
        const validData = {
            gallonsRequested: "5",
            deliveryDate: "2022-03-13"
        };
        const invalidDate = {
            gallonsRequested: "abc",
            deliveryDate: "#(@*$dfw"
        };
        expect(QuoteService.invalidData(validData)).toBe(false);
        expect(QuoteService.invalidData(invalidDate)).toBe(true);
        userId = null;
    })

    test("quote insert", async () => {
        const userID = "abc";
        const data = {
            gallonsRequested: 5,
            deliveryDate: "2022-03-13"
        };
        const profile = new Profile(userID, "a", "b", "c", "d", "e", "f");
        const quote = await QuoteService.insert(userID, data, profile);
        expect(quote).toHaveProperty("gallonsRequested")
        expect(quote).toHaveProperty("deliveryDate")
        expect(quote).toHaveProperty("deliveryAddress")
        expect(quote).toHaveProperty("timeStamp")
        expect(quote).toHaveProperty("suggestedPrice")
        expect(quote).toHaveProperty("totalPrice")
        expect(quote.suggestedPrice).toMatch(dollarsRegex);
        expect(quote.totalPrice).toMatch(dollarsRegex);
        userId = quote.userId;
    });

    test("quote insert many", async () => {
        const userId = "abc";
        const data1 = {
            gallonsRequested: "5",
            deliveryDate: "2022-03-13"
        };

        const data2 = {
            gallonsRequested: "15",
            deliveryDate: "2022-04-13"
        };
        const profile = new Profile(userId, "a", "b", "c", "d", "e", "f");
        await QuoteService.insert(userId, data1, profile);
        await QuoteService.insert(userId, data2, profile);
        const res = await pool.query('SELECT * FROM fuelquote WHERE userid = $1', [userId]);
        expect(res.rows.length).toBeGreaterThan(0);
    });

    test("quote history", async () => {
        const userid = "abc";
        const data1 = {
            gallonsRequested: 5,
            deliveryDate: "2022-03-13"
        };

        const data2 = {
            gallonsRequested: 15,
            deliveryDate: "2022-04-13"
        };
        const profile = new Profile(userid, "a", "b", "c", "d", "e", "f");
        const quote1 = await QuoteService.insert(userid, data1, profile);
        const quote2 = await QuoteService.insert(userid, data2, profile);
        const history = await QuoteService.getHistory(userid);

        history[0].userId = history[0].userid;
        delete history[0].userid;
        history[1].userId = history[1].userid;
        delete history[1].userid;

        quote1.gallonsRequested = "5";
        quote2.gallonsRequested = "15";
        expect(history).toEqual([quote1, quote2]);
    })
})
