import React from 'react';
import {Link} from "@/i18n/routing";

const LanguageSwitcher: React.FC = () => {

    return (
        <div>
            <Link href={'/'} locale={'en'} className="mr-2">
                English
            </Link>
            <Link href={'/'} locale={'ar'} className="mr-2">
                العربية
            </Link>
        </div>
    );
};

export default LanguageSwitcher;
