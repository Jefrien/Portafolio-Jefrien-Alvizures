import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import { TranslationProvider } from "react-autolocalise";


import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import PageTransition from './components/PageTransition.jsx';
import './style.css';
import { ThemeProvider } from './theme-provider.jsx';

export function App() {
	return (
		<LocationProvider>
			<TranslationProvider
				config={{
					apiKey: "at_client_z2ajdV5MfhXy",
					sourceLocale: "en",
					targetLocale: "es",
				}}
			>
				<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
					<Header />
					<main>
						<PageTransition>
							<Router>
								<Route path="/" component={Home} />
								<Route default component={NotFound} />
							</Router>
						</PageTransition>
					</main>
				</ThemeProvider>
			</TranslationProvider>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
