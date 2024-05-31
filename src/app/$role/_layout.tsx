import { Outlet, createFileRoute, notFound } from '@tanstack/react-router';
import Navbar from '../_components/_partials/-navbar';
import Sidebar from '../_components/_partials/-sidebar';
import { UserRoleEnum } from '@/common/constants/enums';

export const Route = createFileRoute('/$role/_layout')({
	loader: ({ params }) => {
		if (
			!Object.values(UserRoleEnum)
				.map((role) => String(role))
				.includes(params.role)
		) {
			throw notFound();
		}
	},
	component: Layout
});

export default function Layout() {
	return (
		<div>
			<Navbar />
			<Sidebar />
			<Outlet />
		</div>
	);
}
