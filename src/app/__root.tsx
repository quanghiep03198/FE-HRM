import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/@shadcn/sonner";
import { persistor, store } from "@/store/store";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Route = createRootRoute({
	component: () => (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeProvider>
					<Toaster />
					<Outlet />
				</ThemeProvider>
			</PersistGate>
			<TanStackRouterDevtools position='bottom-right' />
		</Provider>
	)
});
