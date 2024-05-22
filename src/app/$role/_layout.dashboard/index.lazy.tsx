import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/$role/_layout/dashboard/")({
	component: () => <div>Hello /admin/__layout/dashbard/!</div>
});
