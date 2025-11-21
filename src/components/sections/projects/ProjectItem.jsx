
import Image from "@/components/Image";
import { EyeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GithubIcon } from "lucide-react";


export const ProjectItem = ({ project }) => {
    const { t } = useTranslation();
    return (
        <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            href={project.url}
            className="flex flex-col h-full rounded-lg shadow-lg overflow-hidden group p-4 bg-secondary border border-primary/10">
            <div className='h-64 relative overflow-hidden rounded-lg'	>
                <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="rounded-lg w-full h-full object-cover object-top  group-hover:scale-105 transition-transform duration-300"
                    forceSize={768}
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between ">
                    <div className='group-hover:opacity-100 lg:opacity-0 p-2 transition-all duration-300 bg-gradient-to-b from-black/60 to-transparent w-full flex gap-4 items-center justify-end'>
                        {project.github && (
                            <a href={project.github} className='py-0 rounded px-2 bg-primary text-white dark:bg-primary dark:text-black text-sm font-semibold flex items-center gap-2'>
                                <GithubIcon size={16} />
                                GitHub
                            </a>
                        )}
                    </div>

                </div>


            </div>
            <div>
                <div className="flex flex-col items-start justify-center mb-1 mt-2">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                    </a>
                    <div className="flex flex-wrap gap-2 my-2 h-12">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="bg-primary text-white h-4 dark:text-black rounded-3xl px-2 text-xs font-semibold  hover:bg-primary/90 transition-colors cursor-pointer">{tech}</span>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-neutral-800 dark:text-neutral-300 line-clamp-4">{project.description}</p>
            </div>
        </motion.a>
    )
}
