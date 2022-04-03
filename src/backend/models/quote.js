import client from "../db.js";
import QuoteService from '../services/quote.js';

export default async function insertQuote(userId, quote, profile) {
    await client.query(`INSERT INTO fuelquote VALUES ($1, $2, $3, $4, $5, $6, $7);`, 
    [userId, quote.timeStamp, quote.gallonsRequested, quote.deliveryAddress, quote.deliveryDate, quote.suggestedPrice, quote.totalPrice]);
}

export async function getQuoteHistory(userId) {
    const data = await client.query(`SELECT * FROM FuelQuote WHERE userId = $1`, [userId]);
    return data.rows;
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