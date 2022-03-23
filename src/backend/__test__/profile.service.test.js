import ProfileService, { Profile, profiles } from '../services/profile.js';
import { expect } from '@jest/globals';
import UserService from '../services/user.js';

UserService.insertUser("test", "test");
let USER_ID = UserService.findByUsername("test").id;
console.log(USER_ID);

function clearProfiles(){
    for(let i = 0; i < profiles.length; i++){
        profiles.pop();
    }
}

test('Add profile', async () => {
    clearProfiles()

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    ProfileService.addProfile(payload);
    expect(profiles).toContainEqual(payload);
});

test('Modify profile', async () => {
    clearProfiles()

    let payload1 = new Profile(12, "a", "b", "c", "d", "e", "f")
    let payload2 = new Profile(12, "e", "b", "q", "d", "Z", "f")

    ProfileService.addProfile(payload1)
    ProfileService.updateProfile(payload2)

    expect(profiles).not.toContainEqual(payload1);
    expect(profiles).toContainEqual(payload2);
});

test('Find profile', async () => {
    clearProfiles()

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    profiles.push(payload);    
    let ret = ProfileService.findByUserId(12);
    
    expect(ret).toEqual(payload)
});

test('Remove profile', async () => {
    clearProfiles()

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");
    profiles.push(payload);

    let ret = ProfileService.removeProfile(12);
    expect(ret).not.toContainEqual(payload)
});

test('Validate valid profile', async () => {
    clearProfiles()
    let ret = ProfileService.validateProfile(new Profile(12, "a", "b", "c", "d", "TX", "77777"))
    expect(ret).toBeUndefined()
});

test('Validate invalid profile', async () => {
    clearProfiles()
    let ret = ProfileService.validateProfile(new Profile(12, "a", "b", "c", "d", "TXasdas-d3i0dn_*F#NFUINW", "30BHC)FB#)UBF)S"))
    expect(ret).not.toBeUndefined()
});

test('full address profile', async () => {
    clearProfiles()
    let profile = new Profile(12, "a", "b", "c", "d", "e", "f");
    expect(profile.fullAddress).toBe(`b<br>c<br>d, e - f`)
});

test('Validate valid profile no address2', async () => {
    clearProfiles()
    let ret = ProfileService.validateProfile(new Profile(12, "a", "b", "", "d", "TX", "77777"))
    expect(ret).toBeUndefined()
});