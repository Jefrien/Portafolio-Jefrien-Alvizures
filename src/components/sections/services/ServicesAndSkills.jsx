import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Braces, Cloud, Database, Layers, Smartphone, Workflow } from "lucide-react";

const skillGroups = [
    { title: "Frontend", icon: Layers, skills: ["React", "Vue 3", "Astro", "Tailwind CSS", "shadcn-vue"] },
    { title: "Backend and APIs", icon: Braces, skills: ["TypeScript", "JavaScript", "PHP", "Laravel", "Node.js", "REST APIs"] },
    { title: "AI and automation", icon: Workflow, skills: ["OpenAI API", "Gemini API", "n8n", "Webhooks"] },
    { title: "Mobile and real time", icon: Smartphone, skills: ["Capacitor", "Laravel Reverb", "WebSockets"] },
    { title: "Databases", icon: Database, skills: ["MySQL", "PostgreSQL", "Supabase", "MongoDB"] },
    { title: "DevOps and Cloud", icon: Cloud, skills: ["Docker", "AWS Lambda", "Cloudflare Workers", "Vercel", "Git"] },
];

export const ServicesAndSkills = () => {
    const { t } = useTranslation();



    return (
        <motion.section
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="services"
            className="py-20 lg:py-32 ">
            <div className="container mx-auto px-4 xl:px-8">
                <motion.h2
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl text-center font-semibold mb-6 mt-4 xl:mt-2">
                    {t("Services & Skills")}
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-10 lg:gap-14 mt-12">
                    <div className="py-4 md:py-12 ">
                        <h2 className="text-3xl font-bold mb-8">{t("Services")}</h2>
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


                    <section id="skills" aria-labelledby="skills-title" className="py-4 md:py-12">
                        <h2 id="skills-title" className="mb-8 text-3xl font-bold">{t("Technical Skills")}</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {skillGroups.map(({ title, icon: Icon, skills }) => (
                                <div key={title} className="rounded-xl border border-primary/15 bg-secondary p-4">
                                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                                        <Icon size={18} aria-hidden="true" className="shrink-0 text-primary" />
                                        {t(title)}
                                    </h3>
                                    <ul className="flex flex-wrap gap-2">
                                        {skills.map((skill) => (
                                            <li key={skill} className="rounded-full border border-primary/15 px-3 py-1 text-sm text-foreground">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

            </div>
        </motion.section>
    )
}
