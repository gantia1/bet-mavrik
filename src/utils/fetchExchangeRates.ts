export const fetchExchangeRates = async (currency: string = 'EUR') => {
    const res = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch exchange rates for ${currency}`);
    }
    return res.json();
};
