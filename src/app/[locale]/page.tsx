import { fetchExchangeRates } from "@/utils/fetchExchangeRates";
import ExchangeRates from "@/components/ExchangeRates";
import {unstable_setRequestLocale} from "next-intl/server";

interface Props {
    params: {
        locale: string;
    }
}

export default async function Home({params:{locale}}: Props) {
    unstable_setRequestLocale(locale)
    let exchangeRates;

    try {
        exchangeRates = await fetchExchangeRates('EUR');
    } catch (error) {
        console.error(error);
        return <div>Error fetching exchange rates</div>;
    }

    return <ExchangeRates initialRates={exchangeRates.data.rates} />;
}
