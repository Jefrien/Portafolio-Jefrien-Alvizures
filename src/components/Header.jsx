import { twMerge } from "tailwind-merge";
import { MainDesktop } from "./nav/MainDesktop";
import { MainMobile } from "./nav/MainMobile";
import { useState } from "react";
import { useEffect } from "react";

export function Header() {
	
	const [isFixed, setIsFixed] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 50) {
			setIsFixed(true);
		} else {
			setIsFixed(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header className={twMerge(
			'py-8 xl:py-12 text-black dark:text-white',
			isFixed ? 'fixed top-0 left-0 right-0 z-50 bg-white dark:bg-background/80 backdrop-blur-sm shadow-xl py-4 xl:py-4' : ''
		)}>
			<div className="container px-4 xl:px-8 mx-auto flex justify-between items-center">

				<a href="/">
					<h1 className='text-3xl lg:text-4xl font-semibold'>
						Jefrien<span className='text-primary animate-pulse'>.</span>
					</h1>
				</a>

				<MainDesktop />	
				<MainMobile />

			</div>
		</header>
	);
}
