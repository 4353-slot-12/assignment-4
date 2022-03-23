import { beforeEach, expect, test, describe } from "@jest/globals";
import QuoteService, { quotes } from '../services/quote.js';
import { Profile } from '../services/profile.js';

const dollarsRegex = /^\$[\d,]+.\d{2}$/;


describe("quote service tests", () => {
    beforeEach(() => quotes.clear());

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
    })

    test("quote insert", () => {
        const userId = "abc";
        const data = {
            gallonsRequested: 5,
            deliveryDate: "2022-03-13"
        };
        const profile = new Profile(userId, "a", "b", "c", "d", "e", "f");
        const quote = QuoteService.insert(userId, data, profile);
        expect(quote).toHaveProperty("gallonsRequested")
        expect(quote).toHaveProperty("deliveryDate")
        expect(quote).toHaveProperty("deliveryAddress")
        expect(quote).toHaveProperty("timeStamp")
        expect(quote).toHaveProperty("suggestedPrice")
        expect(quote).toHaveProperty("totalPrice")
        expect(quote.suggestedPrice).toMatch(dollarsRegex);
        expect(quote.totalPrice).toMatch(dollarsRegex);
    });

    test("quote insert many", () => {
        const userId = "abc";
        const data1 = {
            gallonsRequested: 5,
            deliveryDate: "2022-03-13"
        };

        const data2 = {
            gallonsRequested: 15,
            deliveryDate: "2022-04-13"
        };
        const profile = new Profile(userId, "a", "b", "c", "d", "e", "f");
        QuoteService.insert(userId, data1, profile);
        QuoteService.insert(userId, data2, profile);
        expect(quotes.has(userId)).toBe(true);
        expect(quotes.get(userId).length).toBe(2);
    });

    test("quote history", () => {
        const userId = "abc";
        const data1 = {
            gallonsRequested: 5,
            deliveryDate: "2022-03-13"
        };

        const data2 = {
            gallonsRequested: 15,
            deliveryDate: "2022-04-13"
        };
        const profile = new Profile(userId, "a", "b", "c", "d", "e", "f");
        QuoteService.insert(userId, data1, profile);
        QuoteService.insert(userId, data2, profile);
        const history = QuoteService.getHistory(userId);
        expect(history).toEqual(quotes.get(userId));
    })
})
