import { useLocation } from 'preact-iso';
import { useAutoTranslate } from "react-autolocalise";
import { twMerge } from 'tailwind-merge';
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '@/theme-provider';

const menuLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];


export const MainDesktop = () => {
    const { url } = useLocation();
    const { t } = useAutoTranslate();

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
            <button                                
                className="size-8 hover:bg-primary/10 flex items-center justify-center cursor-pointer rounded-full w-12 h-12 ml-4"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                {theme === 'light' ? (
                    <MoonIcon className="size-6" />
                ) : (
                    <SunIcon className="size-6" />
                )}
            </button>
        </nav>
    )
}
