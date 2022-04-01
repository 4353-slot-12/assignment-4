import client from "../db.js";
import QuoteService from '../services/quote.js';

async function insertQuote(userId, data, profile) {
    try {
        quote = QuoteService.insert(userId, data, profile)
        await client.connect();
        await client.query(`INSERT INTO FuelQuote (timeStamp, gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalPrice) VALUES (${quote.timeStamp}, ${quote.gallonsRequested}, ${quote.deliveryAddress}, ${quote.deliveryDate}, ${quote.suggestedPrice}, ${quote.totalPrice});`);
        await client.end();
    } catch(err) {
        console.log(err);
    }
}

async function getQuoteHistory() {
    try {
        await client.connect();
        const data = await client.query(`SELECT * FROM FuelQuote`);
        await client.end();
        return data;
    } catch(err) {
        console.log(err);
    }
}

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