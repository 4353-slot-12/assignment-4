import client from "../db.js";

export default async function insertQuote(userId, quote, profile) {
    await client.query(`INSERT INTO fuelquote VALUES ($1, $2, $3, $4, $5, $6, $7);`, 
    [userId, quote.timeStamp, quote.gallonsRequested, quote.deliveryAddress, quote.deliveryDate, quote.suggestedPrice, quote.totalPrice]);
}

export async function getQuoteHistory(userId) {
    const data = await client.query(`SELECT * FROM FuelQuote WHERE userid = $1`, [userId]);
    return data.rows;
}