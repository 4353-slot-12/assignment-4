import client from "../db.js";
import { Profile } from "../services/profile.js";

export default async function select_profile(userId){
    const res = await client.query('SELECT * FROM userprofiles WHERE userId = $1', [userId]);
    if(res.rows[0] === undefined) 
        return undefined;
    return new Profile(res.rows[0].userid, res.rows[0].name, res.rows[0].address1, res.rows[0].address2, 
        res.rows[0].city, res.rows[0].state, res.rows[0].zip);
}

export async function insert_profile(profile){ // Pass profile as a list!
    let q = `INSERT INTO userprofiles VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    await client.query(q, profile);
}

export async function update_profile(userId, profile){ // Pass profile as a list without userId.
    let q = "UPDATE userprofiles SET name = $1, address1 = $2, address2 = $3, city = $4, state = $5, zip = $6 WHERE userId = $7";
    profile.push(userId);
    await client.query(q, profile);
}

export async function remove_profile(userId){
    await client.query('DELETE from userprofiles WHERE userId = $1', [userId]);
}