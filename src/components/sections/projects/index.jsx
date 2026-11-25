import { useTranslation } from "react-i18next";
import { ProjectItem } from "./ProjectItem";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";


export const ProjectsSection = () => {
    const { t } = useTranslation();
    // @ts-ignore
    const { projects: projectsList } = t('projects', { returnObjects: true });
    const gridRef = useRef(null);
    const itemsPerPage = 3;

    const [page, setPage] = useState(1);
    const [shouldScroll, setShouldScroll] = useState(false);

    const projects = Array.isArray(projectsList) ? projectsList.slice(0, page * itemsPerPage) : [];
    const totalPages = Math.ceil((projectsList?.length ?? 0) / itemsPerPage);

    useEffect(() => {
        if (!shouldScroll || !gridRef.current) return;

        const timeout = setTimeout(() => {
            const firstNewProject = gridRef.current.children[(page - 1) * itemsPerPage];
            firstNewProject?.scrollIntoView({ behavior: "smooth", block: "start" });
            setShouldScroll(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [page, shouldScroll]);

    return (
        <motion.section 
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="projects"
            className="py-20 lg:py-32 bg-accent">
            <div className="container mx-auto px-4 xl:px-8">
                <motion.h2 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl text-center font-semibold mb-6 mt-4 xl:mt-2 text-white">
                    {t("Projects")}
                </motion.h2>

                <motion.div 
                    ref={gridRef}
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="sync">
                        {projects.length > 0 &&
                            // @ts-ignore
                            projects.map((project, index) => (
                                <motion.div
                                    key={project.slug}
                                    className="scroll-mt-24"
                                    initial={index < itemsPerPage ? false : { opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ 
                                        duration: 0.3,
                                        delay: index * 0.1
                                    }}
                                    layout
                                >
                                    <ProjectItem project={project} />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div 
                    layout
                    className="flex justify-center mt-12 gap-4">
                    <Button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="disabled:opacity-50 hover:!bg-white hover:opacity-80 cursor-pointer dark:hover:!bg-transparent"
                        variant="outline"
                    >
                        {t("Load Less")}
                    </Button>
                    <Button
                        onClick={() => {
                            setPage(prev => prev + 1);
                            setShouldScroll(true);
                        }}
                        disabled={page >= totalPages}
                        className="disabled:opacity-50 hover:!bg-white hover:opacity-80 cursor-pointer dark:hover:!bg-transparent"
                        variant="outline"
                    >
                        {t("Load More")}
                    </Button>
                </motion.div>

            </div>
        </motion.section>
    )
}
