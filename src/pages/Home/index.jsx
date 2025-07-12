import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { DownloadIcon } from "lucide-react";
import TypeWriterHome from "@/components/sections/header/TypeWriterHome";
import { Social } from "@/components/sections/header/Social";
import { Photo } from "@/components/sections/header/Photo";
import { Stats } from "@/components/sections/header/Stats";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";
import { FooterSection } from "@/components/sections/footer";

export function Home() {
	const { t } = useTranslation();
	return (
		<div class="home h-full">
			<section id="home" className="container mx-auto px-4 xl:px-8 h-full">
				<div className="flex flex-col xl:flex-row items-center justify-between pt-8 xl:pt-16 xl:pb-24">
					<div className='text-center xl:text-left order-2 xl:order-none'>
						<span className='text-xl min-h-[28px] block '>
							<TypeWriterHome />
						</span>
						<h1 className='text-4xl md:text-5xl xl:text-6xl 3xl:text-7xl leading-[1.1] font-semibold mb-6 mt-4 xl:mt-2'>{t("Hello I'm")}
							<br /> <span className="text-primary">Jefrien Alvizures</span>
						</h1>
						<p className='max-w-[500px] mb-9 text-black/80 dark:text-white/80'>
							{t("Full Stack Developer passionate about building smart, scalable, and user-friendly web applications.")}
						</p>

						<div className="flex flex-col xl:flex-row gap-8 items-center">
							<a href="/files/Jefrien Alvizures - esp.pdf" target="_blank" rel="noopener noreferrer" download>
								<Button variant="outline" size="xl" color="primary" className="uppercase flex items-center gap-2 border-primary rounded-4xl hover:!bg-primary hover:!text-primary-foreground cursor-pointer">
									<span>{t("Download CV")}</span>
									<DownloadIcon size={20} />
								</Button>
							</a>
							<div className="mb-8 xl:mb-0">
								<Social containerStyles="flex gap-4" iconStyles="w-12 h-12 text-2xl border border-primary rounded-full flex items-center justify-center cursor-pointer text-primary hover:bg-primary transition-all duration-500 hover:text-primary-foreground" />
							</div>
						</div>



					</div>
					<div className='order-1 xl:order-none mb-8 xl:mb-0'>
						<Photo />
					</div>

				</div>

				<Stats />

			</section>

			<ProjectsSection />
			<ContactSection />
			<FooterSection />
		</div>
	);
}
