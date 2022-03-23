import ProfileService from '../services/profile.js';
import QuoteService from '../services/quote.js';

export default class QuoteController {
    static history(req, res) {
        const data = QuoteService.getHistory(req.user.id)
        res.status(200).send(data);
    }

    static create(req, res) {
        if (QuoteService.invalidData(req.body))
        return res.redirect('/quote');

        const profile = ProfileService.findByUserId(req.user.id);
        const data = QuoteService.insert(req.user.id, req.body, profile);
        delete data.userId;
        return res.status(201).send(data);
    }
}