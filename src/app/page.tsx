import { fetchExchangeRates } from "@/utils/fetchExchangeRates";
import ExchangeRates from "@/components/ExchangeRates";

export default async function Home() {
    let exchangeRates;

    try {
        exchangeRates = await fetchExchangeRates('EUR');
    } catch (error) {
        console.error(error);
        return <div>Error fetching exchange rates</div>;
    }

    return <ExchangeRates initialRates={exchangeRates.data.rates} />;
}
