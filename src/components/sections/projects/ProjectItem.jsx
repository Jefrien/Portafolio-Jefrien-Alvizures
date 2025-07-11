
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";


export const ProjectItem = ({ project }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
            <div className='h-64 relative overflow-hidden'	>
                <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="rounded-lg w-full h-full object-cover object-top  group-hover:scale-105 transition-transform duration-300"
                    forceSize={768}
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between bg-gradient-to-b from-transparent via-transparent to-black dark:to-background">
                    <div className='group-hover:opacity-100 lg:opacity-0 p-2 transition-all duration-300 bg-gradient-to-b from-black/60 to-transparent w-full flex gap-4 items-center justify-end'>
                        <a href={`/projects/${project.slug}`} className='py-0 rounded px-2 bg-primary text-white dark:bg-primary dark:text-black text-sm font-semibold flex items-center gap-2'>
                            <EyeIcon size={16} />
                            {t('more_details')}
                        </a>                        
                    </div>
                    <span className="text-emerald-300 dark:text-primary text-sm font-semibold  p-4">{project.technologies.join(', ')}</span>
                </div>


            </div>
            <div className="p-2 bg-background">
                <div className="flex flex-col items-start justify-center mb-1">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                    </a>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-4">{project.description}</p>
            </div>
        </motion.div>
    )
}
