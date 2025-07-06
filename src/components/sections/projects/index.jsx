import { useTranslation } from "react-i18next";
import Image from "@/components/Image";

export const ProjectsSection = () => {
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true });
    return (
        <section className=" py-32">
            <div className="container mx-auto px-4 xl:px-8">
                <h2 className="text-4xl text-center font-semibold mb-6 mt-4 xl:mt-2">{t("Projects")}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

                    {projects.
                        // @ts-ignore
                        projects.map((project, index) => (
                            <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
                                <div className='h-64 relative overflow-hidden'	>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={800}
                                        height={600}
                                        className="rounded-lg w-full h-full object-cover object-top  group-hover:scale-105 transition-transform duration-300"
                                        forceSize={768}
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full p-4 flex items-end justify-start bg-gradient-to-b from-transparent via-transparent to-black dark:to-background">
                                        <span className="text-emerald-300 dark:text-primary text-sm font-semibold">{project.technologies.join(', ')}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-background">
                                    <div className="flex flex-col items-start justify-center mb-1">
                                        <h3 className="text-xl font-semibold">{project.title}</h3>
                                    </div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-4">{project.description}</p>
                                </div>
                            </div>
                        ))}

                </div>

            </div>
        </section>
    )
}
