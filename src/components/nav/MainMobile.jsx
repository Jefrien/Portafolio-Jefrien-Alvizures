
import { useLocation } from 'preact-iso';
import { twMerge } from 'tailwind-merge';
import { MenuIcon } from '../icons/MenuIcon'
import { useState } from 'preact/hooks';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from "react-i18next";
import { LangSwitcher } from './LangSwitcher';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '@/theme-provider';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';

const menuLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

export const MainMobile = () => {
    const { url } = useLocation();
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <div className="lg:hidden">
            <div className="flex items-center">

                <div className="flex gap-1 lg:gap-4 items-center">
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
                <button className="text-primary cursor-pointer h-11 w-11 flex items-center justify-center hover:bg-primary/10 ml-4" onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon size={32} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="overlay"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className='fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex items-center justify-end'
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            key="drawer"
                            initial={{ x: 999 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            exit={{ x: 999 }}
                            className='bg-neutral-100 dark:bg-neutral-900 p-6 flex flex-col gap-4 w-[80%] sm:w-[70%] md:w-[50%] h-screen '
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className='cursor-pointer absolute top-4 right-4 rounded-full w-9 h-9 flex items-center justify-center'
                                onClick={() => setIsOpen(false)}
                            >
                                <XIcon size={20} />
                            </Button>

                            <a href="#home" onClick={() => setIsOpen(false)}>
                                <h1 className='text-2xl font-semibold text-center mt-20 mb-32'>
                                    Jefrien<span className='text-primary'>.</span>
                                </h1>
                            </a>
                            {menuLinks.map((link) => (
                                <a href={link.href} onClick={() => setIsOpen(false)} className={twMerge(
                                    'capitalize text py-2 text-center font-medium hover:text-primary border-b-2 border-transparent transition-all hover:bg-primary/10',
                                    url == link.href && 'text-primary '
                                )}>
                                    {t(link.label)}
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                )}

            </AnimatePresence>
        </div>
    )
}
