import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/@shadcn/sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import NotFound from './_components/_errors/-not-found';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
	component: RootRoute,
	notFoundComponent: NotFound
});

function RootRoute() {
	return (
		<>
			<ThemeProvider>
				<Toaster position='top-right' />
				<Outlet />
			</ThemeProvider>
			<TanStackRouterDevtools />
		</>
	);
}
