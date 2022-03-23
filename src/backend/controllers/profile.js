import ProfileService from '../services/profile.js';

export default class ProfileController {
    static create(req, res) {
        const profile = {
            userId: req.user.id,
            ...req.body,
        };
    
        const invalidField = ProfileService.validateProfile(profile);
        if (invalidField) 
            return res.status(428).send({ message: `Invalid ${invalidField} field.`})
    
        ProfileService.addProfile(profile);
        return res.redirect('/quote');
    }
    
    
    static edit(req, res) {
        const profile = {
            userId: req.user.id,
            ...req.body,
        }
    
        const invalidField = ProfileService.validateProfile(profile);
        if (invalidField) 
            return res.status(428).send({ message: `Invalid ${invalidField} field.`});
        
        ProfileService.updateProfile(profile);
        return res.redirect('/quote');
    }
    
    
    static get(req, res) {
        const profile = ProfileService.findByUserId(req.user.id);
        if (profile === undefined)
            return res.redirect('/proto-profile');
        return res.status(200).send({data: profile});
    }
}