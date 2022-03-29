import { select_profile } from "../models";
import "/models/index.js"

const wordyRegex = /^\w+(\s+\w+){0,5}$/i;
const zipRegex = /^\d{5}$/;

export class Profile {
    constructor(userId, name, addr1, addr2, city, state, zip){
        this.userId = userId
        this.update(name, addr1, addr2, city, state, zip)
    }

    // TODO: potentially safe to remove
    update(name, addr1, addr2, city, state, zip){
        this.name = name
        this.address1 = addr1
        this.address2= addr2
        this.city = city
        this.state = state
        this.zip = zip
    }

    get fullAddress() {
        const address2 = this.address2.length ? `${this.address2}<br>` : "";
        return `${this.address1}<br>${address2}${this.city}, ${this.state} - ${this.zip}`;
    }
}

// export let profiles = [];

export default class ProfileService {    
    static validateProfile(profile) {
        for (const [key, value] of Object.entries(profile)) {
            if (key === 'address2' && !value.length) continue;
            const regex = key === 'zip' ? zipRegex : wordyRegex;
            if (regex.test(value)) continue;    
            return key;
        }
    }

    static findByUserId(userId) { 
        return select_profile(userId);
    }

    // TODO: is this used anywhere...?
    //static removeProfile(userId) { 
    //    const index = profiles.findIndex(profile => profile.userId === userId);
    //    profiles = profiles.splice(index, 1);
    //    return index;
    //}

    static addProfile(data){
        insert_profile([data.userId, data.name, data.address1, data.address2, data.city, data.state, data.zip]);
    }

    static updateProfile(profile){ // Call using a Profile object
        update_profile(profile.userId, [profile.name, profile.address1, profile.address2, profile.city, profile.state, profile.zip]);
    }
}
