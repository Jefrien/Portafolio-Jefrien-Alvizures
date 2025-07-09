
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";


export const ProjectItem = ({ project }) => {
    return (
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
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
                    <div className='group-hover:opacity-100 opacity-0  p-4 transition-all duration-300 bg-gradient-to-b from-black/60 to-transparent w-full flex items-center justify-end'>
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className='relative group-[link]'>
                            <Button className="cursor-pointer rounded-full w-12 h-12" variant="default" size="lg" iconOnly >
                                <EyeIcon className="size-6" />
                            </Button>                            
                        </a>
                    </div>
                    <span className="text-emerald-300 dark:text-primary text-sm font-semibold  p-4">{project.technologies.join(', ')}</span>
                </div>


            </div>
            <div className="p-2 bg-background">
                <div className="flex flex-col items-start justify-center mb-1">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-4">{project.description}</p>
            </div>
        </div>
    )
}
                                    