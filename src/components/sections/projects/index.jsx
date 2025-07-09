import { useTranslation } from "react-i18next";
import { ProjectItem } from "./ProjectItem";


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
                           <ProjectItem key={index} project={project} />
                        ))}

                </div>

            </div>
        </section>
    )
}
