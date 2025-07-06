import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import PageTransition from './components/PageTransition.jsx';
import './style.css';
import { ThemeProvider } from './theme-provider.jsx';
import en from './locale/en.js';
import es from './locale/es.js';


i18n
	.use(initReactI18next)
	.init({
		resources: { en, es },
		lng: 'en',
		fallbackLng: "en",
		interpolation: {
			escapeValue: false
		}
	});

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
	i18n.changeLanguage(localStorage.getItem('lang') || 'en');
}

export function App() {


	return (
		<LocationProvider>
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
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
