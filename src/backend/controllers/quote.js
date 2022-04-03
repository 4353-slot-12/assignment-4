import ProfileService from '../services/profile.js';
import QuoteService from '../services/quote.js';

export default class QuoteController {
    static async history(req, res) {
        const data = await QuoteService.getHistory(req.user.id)
        res.status(200).send(data);
    }

    static async create(req, res) {
        if (QuoteService.invalidData(req.body)) {
            console.log("invalid data");
            return res.redirect('/quote');
        }

        const profile = await ProfileService.findByUserId(req.user.id);
        console.log(req.body);
        const data = await QuoteService.insert(req.user.id, req.body, profile);
        delete data.userId;
        return res.status(201).send(data);
    }
}