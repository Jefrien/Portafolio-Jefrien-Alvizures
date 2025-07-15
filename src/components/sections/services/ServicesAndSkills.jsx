import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const ServicesAndSkills = () => {
    const { t } = useTranslation();



    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="contact"
            className="py-20 lg:py-32 ">
            <div className="container mx-auto px-4 xl:px-8">
                <motion.h2
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl text-center font-semibold mb-6 mt-4 xl:mt-2">
                    {t("Services & Skills")}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="py-4 md:py-12 ">
                        <h2 className="text-3xl font-bold mb-8">🚀 {t("Services")}</h2>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>{t("Full-Stack Web Development")}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {t("full_stack_service_description")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>{t("Administrative Systems Development")}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {t("admin_systems_service_description")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>{t("API Integration and Automation")}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {t("api_integration_service_description")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>{t("Implementation of AI in projects")}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {t("ai_implementation_service_description")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>{t("Optimization and SEO")}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {t("optimization_service_description")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger>{t("E-commerce and Landing Pages")}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {t("ecommerce_service_description")}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>


                    <section id="skills" className="py-4 md:py-12 ">
                        <div className="max-w-5xl mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-8">🧠 {t("Technical Skills")}</h2>

                            <h3 className="text-lg font-semibold mt-4">{t("Languages")}</h3>
                            <p className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">JavaScript</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">PHP</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">TypeScript</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Python</span>
                            </p>

                            <h3 className="text-lg font-semibold mt-4">{t("Frameworks and Libraries")}</h3>
                            <p className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">React</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Vue</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Laravel</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">WordPress</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Astro</span>
                            </p>

                            <h3 className="text-lg font-semibold mt-4">{t("Databases")}</h3>
                            <p className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">MySQL</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">MongoDB</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Firebase</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Supabase</span>
                            </p>

                            <h3 className="text-lg font-semibold mt-4">{t("DevOps and Cloud")}</h3>
                            <p className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">AWS Lambda</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Firebase Hosting</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Cloudflare Workers</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Docker</span>
                            </p>

                            <h3 className="text-lg font-semibold mt-4">{t("Tools")}</h3>
                            <p className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">VSCode</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Git</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">JetBrains</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Zed</span>
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm">Github Copilot</span>
                            </p>
                        </div>
                    </section>

                </div>

            </div>
        </motion.section>
    )
}
