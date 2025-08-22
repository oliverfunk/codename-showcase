import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/_authed/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(
    convexQuery(api.tasks.getForCurrentUser, {})
  );
  console.log("Data from query:", JSON.stringify(data, null, 2));
  return <div>Hello "/_authed/explore"!</div>;
}
