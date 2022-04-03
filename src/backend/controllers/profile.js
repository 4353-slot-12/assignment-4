import ProfileService from '../services/profile.js';

export default class ProfileController {
    static async create(req, res) {
        const profile = {
            userId: req.user.id,
            ...req.body,
        };
    
        const invalidField = ProfileService.validateProfile(profile);
        if (invalidField) 
            return res.status(428).send({ message: `Invalid ${invalidField} field.`})
    
        await ProfileService.addProfile(profile);
        return res.status(304).redirect('/quote');
    }
    
    
    static async edit(req, res) {
        const profile = {
            userId: req.user.id,
            ...req.body,
        }
    
        const invalidField = ProfileService.validateProfile(profile);
        if (invalidField) 
            return res.status(428).send({ message: `Invalid ${invalidField} field.`});
        
        await ProfileService.updateProfile(profile);
        return res.redirect('/quote');
    }
    
    
    static async get(req, res) {
        const profile = await ProfileService.findByUserId(req.user.id);
        if (profile === undefined)
            return res.redirect('/proto-profile');
        return res.status(200).send({data: profile});
    }
}