import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export function NotFound() {
	return (
		<section className="flex flex-col items-center justify-center pt-36">
			<h1 className="text-7xl font-semibold mb-6  xl:mt-2 text-white">404</h1>
			<p className="text-white mb-8 text-xl">
				Puede que esta página este en construcción.
			</p>
			<a href="/">
				<Button variant="outline" size="xl" color="primary" className="uppercase flex items-center gap-2 border-primary rounded-4xl hover:!bg-primary hover:!text-primary-foreground cursor-pointer">
					<HomeIcon size={20} />
					<span>Home</span>
				</Button>
			</a>
		</section>
	);
}
