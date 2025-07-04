import { MainDesktop } from "./nav/MainDesktop";
import { MainMobile } from "./nav/MainMobile";

export function Header() {
	

	return (
		<header className='py-8 xl:py-12 text-black dark:text-white'>
			<div className="container px-4 xl:px-8 mx-auto flex justify-between items-center">

				<a href="/">
					<h1 className='text-4xl font-semibold'>
						Jefrien<span className='text-primary animate-pulse'>.</span>
					</h1>
				</a>

				<MainDesktop />	
				<MainMobile />

			</div>
		</header>
	);
}
