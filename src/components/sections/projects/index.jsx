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

    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [shouldScroll, setShouldScroll] = useState(false);

    // Efecto para manejar la paginación
    useEffect(() => {
        if (!projectsList || !Array.isArray(projectsList)) return;

        const start = 0;
        const end = page * itemsPerPage;
        const paginatedProjects = projectsList.slice(start, end);
        setProjects(paginatedProjects);
    }, [page, projectsList]);


    // Efecto para actualizar totalPages cuando cambia projectsList
    useEffect(() => {
        if (!projectsList || !Array.isArray(projectsList)) return;
        const total = Math.ceil(projectsList.length / itemsPerPage);
        setTotalPages(total);
    }, [projectsList, itemsPerPage]);

    useEffect(() => {
        if (shouldScroll && gridRef.current) {
            // Esperamos a que las animaciones de los nuevos elementos comiencen
            setTimeout(() => {
                const scrollTarget = gridRef.current.children[Math.max(0, projects.length - 3)];
                if (scrollTarget) {
                    const targetY = scrollTarget.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top: targetY,
                        behavior: 'smooth',                        
                    });
                    setShouldScroll(false);
                }
            }, 700);
        }
    }, [projects, shouldScroll]);

    return (
        <motion.section 
            initial={{ opacity: 0 }}
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
                                    key={project.title}
                                    initial={{ opacity: 0, y: 30 }}
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
                        disabled={page === totalPages}
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
