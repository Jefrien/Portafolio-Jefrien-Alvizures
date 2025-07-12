import { useLocation } from 'preact-iso';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '@/theme-provider';
import { LangSwitcher } from './LangSwitcher';
import { Button } from '../ui/button';

const menuLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];


export const MainDesktop = () => {
    const { url } = useLocation();
    const { t } = useTranslation();

    const { theme, setTheme } = useTheme();

    return (
        <nav className='gap-8 hidden lg:flex items-center'>
            {menuLinks.map((link) => (
                <a href={link.href} className={twMerge(
                    'capitalize font-medium hover:text-primary border-b-2 border-transparent transition-all text-sm',
                    url == link.href && 'text-primary border-b-2 border-primary'
                )}>
                    {t(link.label)}
                </a>
            ))}

            <a href="https://wa.me/50259219162" target="_blank" rel="noopener noreferrer" >
                <Button variant="default" size="lg" className='cursor-pointer' >{t('Hire me')}</Button>
            </a>

            <div className="flex gap-2 lg:gap-4 items-center ml-4">
                <LangSwitcher />

                <button
                    className="size-8 hover:bg-primary/10 flex items-center justify-center cursor-pointer rounded-full w-12 h-12"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    {theme === 'light' ? (
                        <MoonIcon className="size-6" />
                    ) : (
                        <SunIcon className="size-6" />
                    )}
                </button>
            </div>
        </nav>
    )
}
