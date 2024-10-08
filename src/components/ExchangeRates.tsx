'use client';

import React, { useEffect, useState } from 'react';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import getIcon from "@/utils/getIcons";
import { fetchExchangeRates } from "@/utils/fetchExchangeRates";
import {useLocale, useTranslations} from "next-intl";

interface ExchangeRatesProps {
    initialRates: { [key: string]: string };
}

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const ExchangeRates: React.FC<ExchangeRatesProps> = ({ initialRates }) => {
    const t= useTranslations()
    const locale = useLocale();
    const [icons, setIcons] = useState<{ [key: string]: IconComponent | null }>({});
    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
    const [currency, setCurrency] = useState<string>('EUR');
    const [currencyAmount, setCurrencyAmount] = useState<number>(1);
    const [cryptoAmount, setCryptoAmount] = useState<number>(0);
    const [rates, setRates] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        setRates(initialRates);
    }, [initialRates]);

    useEffect(() => {

        const loadIcons = async () => {

                if (rates && typeof rates === 'object' && Object.keys(rates).length > 0 && Object.values(icons).length ===0) {
                    const newIcons: { [key: string]: IconComponent | null } = {};
                    for (const currency of Object.keys(rates)) {
                        newIcons[currency] = await getIcon(currency);
                    }
                    setIcons(newIcons);
                }

        };

        loadIcons();
    }, [rates]);


    useEffect(() => {
        if (selectedCrypto && rates[selectedCrypto]) {
            const rate = parseFloat(rates[selectedCrypto]);
            setCryptoAmount(currencyAmount * rate);
        }
    }, [selectedCrypto, currencyAmount, rates]);

    const handleCurrencyChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = event.target.value;
        setCurrency(newCurrency);
        try {
            const newRates = await fetchExchangeRates(newCurrency);
            setRates(newRates.data.rates);
        } catch (error) {
            console.error(`Failed to fetch exchange rates for ${newCurrency}`, error);
        }
    };

    const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCrypto(event.target.value);
    };

    const handleCurrencyAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');

        if (numericValue) {
            setCurrencyAmount(parseFloat(numericValue));
        } else {
            setCurrencyAmount(0);
        }
    };

    return (
        <div className={'flex items-center justify-center gap-2 w-screen h-screen flex-col'}>
            <LanguageSwitcher />
            <h1 className="text-2xl font-bold">{t('exchangeRates')}</h1>

            <div className="mb-4">
                <label htmlFor="currency-select" className="mr-2">{t('selectCurrency')}:</label>
                <select id="currency-select" onChange={handleCurrencyChange} value={currency}>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="RUB">Russian Ruble (RUB)</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="currency-amount" className="mr-2">Amount in {currency}:</label>
                <input
                    type="text"
                    id="currency-amount"
                    value={currencyAmount}
                    onChange={handleCurrencyAmountChange}
                    className="border p-1"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="crypto-select" className="mr-2">{t('selectCrypto')}:</label>
                <select id="crypto-select" onChange={handleCryptoChange} value={selectedCrypto || ''}>
                    <option value="">Choose a crypto</option>
                    {rates && Object.keys(rates).length > 0 &&
                        Object.keys(rates).map(crypto => (
                            <option key={crypto} value={crypto}>
                                {crypto}
                            </option>
                        ))
                    }
                </select>
            </div>

            {selectedCrypto && (
                <ul>
                    <li key={selectedCrypto} className="flex items-center">
                        {icons[selectedCrypto] ? (
                            React.createElement(icons[selectedCrypto], {
                                className: "mr-2",
                                width: "24",
                                height: "24",
                                viewBox: "0 0 32 32",
                            })
                        ) : (
                            <span className="mr-2">Icon not found</span>
                        )}
                        {selectedCrypto}/{currency}: {new Intl.NumberFormat(locale).format(parseFloat(rates[selectedCrypto]))}
                    </li>
                    <li className="mt-2">
                        {currencyAmount} {currency} = {cryptoAmount.toFixed(6)} {selectedCrypto}
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ExchangeRates;
