"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'si' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
        >
            <Globe size={16} />
            <span className="text-xs font-medium uppercase">
                {i18n.language === 'en' ? 'සිං' : 'EN'}
            </span>
        </Button>
    );
}
