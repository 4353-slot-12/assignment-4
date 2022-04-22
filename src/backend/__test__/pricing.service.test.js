import { beforeEach, expect, test, describe } from "@jest/globals";
import QuoteService, { quotes } from '../services/quote.js';
import { Profile } from '../services/profile.js';
import PricingService from '../services/pricing.js';
import pool from '../db.js';


test("location factor, from TX", () => {
    const profile = new Profile("abc", "a", "b", "c", "d", "e", "f", "TX");
    expect(PricingService.getLocationFactor(profile)).toBe(0.2);
})

test("location factor, from TX", () => {
    const profile = new Profile("abc", "a", "b", "c", "d", "e", "f", "CA");
    expect(PricingService.getLocationFactor(profile)).toBe(0.04);
})

test("gallons requested factor, < 1000", () => {
    let gallonsRequested = 500;
    expect(PricingService.getGallonsRequestedFactor(gallonsRequested)).toBe(0.03);
})

test("gallons requested factor, = 1000", () => {
    let gallonsRequested = 1000;
    expect(PricingService.getGallonsRequestedFactor(gallonsRequested)).toBe(0.03);
})

test("gallons requested factor, > 1000", () => {
    const gallonsRequested = 500;
    expect(PricingService.getGallonsRequestedFactor(gallonsRequested)).toBe(0.02);
})

test("company profit factor", () => {
    expect(PricingService.getCompanyProfitFactor()).toBe(0.1);
})

// describe("async tests", () => {
//     let client;
//     let userId = null;

//     beforeAll(async () => {
//         client = await pool.connect();
//         await client.query("DELETE FROM users WHERE username = $1", ["bob"]);
//     });

//     beforeEach(async () => {
//         if (userId === null) return;
//         await client.query("DELETE FROM users WHERE id = $1", [userId]);
//     })

//     afterAll(async () => {
//         if (userId !== null)
//             await client.query("DELETE FROM users WHERE id = $1", [userId]);
//         await client.release();
//     })
// })