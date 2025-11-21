import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ContactForm } from './form'
import { FaGithub, FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa';

export const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="contact"
            className="py-20 lg:py-32 bg-neutral-800 dark:bg-accent">
            <div className="container mx-auto px-4 xl:px-8">
                <motion.h2
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl text-center font-semibold mb-6 mt-4 xl:mt-2 text-white">
                    {t("Let's talk")}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mt-8">
                    <div>
                        <h3 className='text-xl font-semibold mb-6 mt-4 xl:mt-2 text-white text-center'>{t("About me")}</h3>

                        <p className="text-neutral-200 text-center mb-8">
                            {t("about_me")}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <a href="https://github.com/jefrien" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-transparent rounded hover:bg-primary transition-colors text-white dark:hover:text-black p-4 active:bg-primary">
                                <FaGithub size={32} />
                                <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/jefrien-alvizures/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-transparent rounded hover:bg-primary transition-colors text-white dark:hover:text-black p-4 active:bg-primary">
                                <FaLinkedin size={32} />
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://wa.me/50259219162" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-transparent rounded hover:bg-primary transition-colors text-white dark:hover:text-black p-4 active:bg-primary">
                                <FaWhatsapp size={32} />
                                <span>Whatsapp</span>
                            </a>
                            <a href="tel:+50259219162" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-transparent rounded hover:bg-primary transition-colors text-white dark:hover:text-black p-4 active:bg-primary">
                                <FaPhone size={32} />
                                <span>Call me</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold mb-6 mt-4 xl:mt-2 text-white text-center'>
                            {t("Contact Form")}
                        </h3>
                        <ContactForm />
                    </div>
                </div>

            </div>
        </motion.section>
    )
}
