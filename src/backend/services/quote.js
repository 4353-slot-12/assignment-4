import insertQuote, {getQuoteHistory} from "../models/quote.js"
import PricingService from "./pricing.js";
export const quotes = new Map();

const numberRegex = /^\d+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/
export const suggestedPrice = 1.5;
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function generateTimestamp() {
    const date = new Date();
    date.setMilliseconds(0);
    return date.toISOString();
}

export default class QuoteService {
    static invalidData(data) {
        return !numberRegex.test(data.gallonsRequested) || !dateRegex.test(data.deliveryDate);
    }

    static async insert(userId, data, profile) {

        data.gallonsRequested = parseInt(data.gallonsRequested);
        const suggestedPrice = await PricingService.calculateTotalPrice(profile);
        const quote = { 
            userId,
            deliveryAddress: profile?.fullAddress,
            suggestedPrice: formatter.format(suggestedPrice),
            totalPrice: formatter.format(data.gallonsRequested * suggestedPrice),
            timeStamp: generateTimestamp(),
            ...data,
        };
        // if (quotes.has(userId)) quotes.get(userId).push(quote);
        // else quotes.set(userId, [quote]); 

        await insertQuote(userId, quote, profile)
        return quote;
    }

    static async getHistory(userId) {
        return await getQuoteHistory(userId)
    }
}