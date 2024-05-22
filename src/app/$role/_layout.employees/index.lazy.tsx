import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$role/_layout/employees/")({
	component: () => <div>Hello /$role/_layout/employees/!</div>
});
