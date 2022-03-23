
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

    static insert(userId, data, profile) {
        data.gallonsRequested = parseInt(data.gallonsRequested);
        const quote = { 
            deliveryAddress: profile?.fullAddress,
            suggestedPrice: formatter.format(suggestedPrice),
            totalPrice: formatter.format(data.gallonsRequested * suggestedPrice),
            timeStamp: generateTimestamp(),
            ...data,
        };
        if (quotes.has(userId)) quotes.get(userId).push(quote);
        else quotes.set(userId, [quote]);
        return quote;
    }

    static getHistory(userId) { 
        return quotes.get(userId);
    }
}