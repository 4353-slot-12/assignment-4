import ProfileService, { Profile } from '../services/profile.js';
import { expect } from '@jest/globals';
import UserService from '../services/user.js';

UserService.insertUser("test", "test");
let USER_ID = UserService.findByUsername("test").id;
console.log(USER_ID);

test('Add profile', async () => {
    let payload = new Profile(0, "a", "b", "c", "d", "e", "f");
    await ProfileService.addProfile(payload);
    let res = await ProfileService.findByUserId(0);
    expect(res).toBe(payload);
});

test('Modify profile', async () => {
    let payload1 = new Profile(1, "a", "b", "c", "d", "e", "f")
    let payload2 = new Profile(1, "e", "b", "q", "d", "Z", "f")

    await ProfileService.addProfile(payload1)
    await ProfileService.updateProfile(payload2)

    let ret = await ProfileService.findByUserId(1);

    expect(ret).not.toBe(payload1);
    expect(ret).toBe(payload2);
});

test('Remove profile', async () => {
    let payload = new Profile(0, "a", "b", "c", "d", "e", "f");
    await ProfileService.removeProfile(0);
    let ret = await ProfileService.findByUserId(0);
    expect(ret).not.toBe(payload);
});

test('Validate valid profile', async () => {
    let ret = ProfileService.validateProfile(new Profile(12, "a", "b", "c", "d", "TX", "77777"))
    expect(ret).toBeUndefined()
});

test('Validate invalid profile', async () => {
    let ret = ProfileService.validateProfile(new Profile(12, "a", "b", "c", "d", "TXasdas-d3i0dn_*F#NFUINW", "30BHC)FB#)UBF)S"))
    expect(ret).not.toBeUndefined()
});

test('full address profile', async () => {
    let profile = new Profile(12, "a", "b", "c", "d", "e", "f");
    expect(profile.fullAddress).toBe(`b<br>c<br>d, e - f`)
});

test('Validate valid profile no address2', async () => {
    let ret = ProfileService.validateProfile(new Profile(12, "a", "b", "", "d", "TX", "77777"))
    expect(ret).toBeUndefined()
});