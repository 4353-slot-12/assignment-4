import select_profile, {remove_profile, insert_profile, update_profile} from "../models/index.js";

const wordyRegex = /^\w+(\s+\w+){0,5}$/i;
const zipRegex = /^\d{5}$/;

export class Profile {
    constructor(userId, name, addr1, addr2, city, state, zip){
        this.userId = userId
        this.update(name, addr1, addr2, city, state, zip)
    }

    update(n, a1, a2, c, s, z){
        this.name = n;
        this.address1 = a1;
        this.address2 = a2;
        this.city = c;
        this.state = s;
        this.zip = z;
    }

    get fullAddress() {
        const address2 = this.address2.length ? `${this.address2}<br>` : "";
        return `${this.address1}<br>${address2}${this.city}, ${this.state} - ${this.zip}`;
    }
}

export default class ProfileService {    
    static async validateProfile(profile) {
        for (const [key, value] of Object.entries(profile)) {
            if (key === 'address2' && !value.length) continue;
            const regex = key === 'zip' ? zipRegex : wordyRegex;
            if (regex.test(value)) continue;    
            return key;
        }
    }

    static async findByUserId(userId) { 
        return await select_profile(userId);
    }

    static async removeProfile(userId) { 
        await remove_profile(userId);
    }

    static async addProfile(data){
        await insert_profile([data.userId, data.name, data.address1, data.address2, data.city, data.state, data.zip]);
    }

    static async updateProfile(profile){ // Call using a Profile object
        await update_profile(profile.userId, [profile.name, profile.address1, profile.address2, profile.city, profile.state, profile.zip]);
    }
}
