const currentPrice = 1.50;


export default class PricingService {
    static getLocationFactor(profile) {
        if (profile.state === 'TX') return 0.02;
        return 0.04;
    }

    static async getRateHistoryFactor(userId) {
        const history = await getQuoteHistory(userId);
        if (history.length) return 0.01;
        return 0;
    }

    static getGallonsRequestedFactor(gallonsRequested) {
        gallonsRequested = parseInt(gallonsRequested, 10);
        if (gallonsRequested > 1000) return 0.02;
        return 0.03;
    }

    static getCompanyProfitFactor() {
        return 0.1;
    }

    static async calculateMargin(profile) {
        const locationFactor = PricingService.getLocationFactor(profile);
        const rateHistoryFactor = await PricingService.getRateHistoryFactor(profile.userId);
        const gallonsRequestedFactor = PricingService.getGallonsRequestedFactor(profile.gallonsRequested);
        const companyProfitFactor = PricingService.getCompanyProfitFactor();
        return currentPrice * (locationFactor + rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor);
    }

    static async calculateTotalPrice(profile) {
        const margin = await PricingService.calculateMargin(profile);
        return currentPrice + margin;
    }
}