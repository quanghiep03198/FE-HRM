import { RouterProvider, createRouter } from '@tanstack/react-router';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { i18n } from './i18n';
import { routeTree } from './routeTree.gen';
import { persistor, store } from './store/store';

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: 'intent'
});

// Register things for typesafety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<I18nextProvider i18n={i18n}>
					<RouterProvider router={router} />
				</I18nextProvider>
			</PersistGate>
		</Provider>
	);
}
