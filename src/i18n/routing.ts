import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['en', 'ar'],
    defaultLocale: 'en'
});

export const {Link} =
    createSharedPathnamesNavigation(routing);
