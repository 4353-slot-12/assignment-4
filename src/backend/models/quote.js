import client from "../db.js";
import QuoteService from '../services/quote.js';

export default async function insertQuote(userId, quote, profile) {
    console.log(quote);
    try {
        // quote = QuoteService.insert(userId, data, profile)
        await client.query(`INSERT INTO fuelquote (timeStamp, gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalPrice) VALUES ($1, ${quote.gallonsRequested}, '${quote.deliveryAddress}', '${quote.deliveryDate}', ${quote.suggestedPrice}, ${quote.totalPrice});`, [quote.timeStamp]);
    } catch(err) {
        console.log(err);
    }
}

export async function getQuoteHistory() {
    try {
        const data = await client.query(`SELECT * FROM FuelQuote`);
        return data;
    } catch(err) {
        console.log(err);
    }
}

// test("quote insert", () => {
//     const userId = "abc";
//     const data = {
//         gallonsRequested: 5,
//         deliveryDate: "2022-03-13"
//     };
//     const profile = new Profile(userId, "a", "b", "c", "d", "e", "f");
//     const quote = QuoteService.insert(userId, data, profile);
//     expect(quote).toHaveProperty("gallonsRequested")
//     expect(quote).toHaveProperty("deliveryDate")
//     expect(quote).toHaveProperty("deliveryAddress")
//     expect(quote).toHaveProperty("timeStamp")
//     expect(quote).toHaveProperty("suggestedPrice")
//     expect(quote).toHaveProperty("totalPrice")
//     expect(quote.suggestedPrice).toMatch(dollarsRegex);
//     expect(quote.totalPrice).toMatch(dollarsRegex);
// });