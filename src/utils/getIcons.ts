const getIcon = async (currency: string) => {
    try {
        const Icon = await import(`cryptocurrency-icons/svg/color/${currency.toLowerCase()}.svg`);
        return Icon.default;
    } catch (error) {
        console.error(`Icon for ${currency} not found.`, error);
        return null;
    }
};

export default getIcon;
