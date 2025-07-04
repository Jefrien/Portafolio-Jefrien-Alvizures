
import { useLocation } from 'preact-iso';
import { useAutoTranslate } from "react-autolocalise";
import { twMerge } from 'tailwind-merge';
import { MenuIcon } from '../icons/MenuIcon'
import { useState } from 'preact/hooks';
import { motion, AnimatePresence } from 'motion/react';

const menuLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

export const MainMobile = () => {
    const { url } = useLocation();
    const { t } = useAutoTranslate();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <button className="text-primary cursor-pointer h-11 w-11 flex items-center justify-center hover:bg-primary/10" onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon size={32} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="overlay"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex items-center justify-end p-6'
                        onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                key="drawer"
                                initial={{ x: 999 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                exit={{ x: 999 }}
                                className='bg-neutral-900 p-6 rounded-2xl flex flex-col gap-4 w-[95%] sm:w-[80%] md:w-[50%] h-[95vh] border border-primary/20'
                                onClick={(e) => e.stopPropagation()}
                            >
                                <a href="/">
                                    <h1 className='text-2xl font-semibold text-center mt-20 mb-32'>
                                        Jefrien<span className='text-primary'>.</span>
                                    </h1>
                                </a>
                                {menuLinks.map((link) => (
                                    <a href={link.href} className={twMerge(
                                        'capitalize text py-2 text-center font-medium hover:text-primary border-b-2 border-transparent transition-all hover:bg-primary/10',
                                        url == link.href && 'text-primary '
                                    )}>
                                        {t(link.label)}
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>
   
                )}

                {/*  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        onClick={() => setOpen(false)}
                        className={twMerge('hidden fixed top-0 left-0 right-0 w-full h-screen bottom-0 bg-black/80 z-50 p-4 align-end justify-end', open && 'flex')}>


                        <nav className="bg-background p-6 rounded-2xl flex flex-col gap-4 w-2/3 h-[95vh] border border-primary/20" onClick={(e) => e.stopPropagation()}>
                            <a href="/">
                                <h1 className='text-2xl font-semibold text-center py-8'>
                                    Jefrien<span className='text-primary'>.</span>
                                </h1>
                            </a>
                            {menuLinks.map((link) => (
                                <a href={link.href} className={twMerge(
                                    'capitalize text py-2 text-center font-medium hover:text-emerald-600 border-b-2 border-transparent transition-all hover:bg-emerald-600/10',
                                    url == link.href && 'text-emerald-600 '
                                )}>
                                    {t(link.label)}
                                </a>
                            ))}
                        </nav>
                    </div>
                </motion.div> */}
            </AnimatePresence>
        </div>
    )
}
