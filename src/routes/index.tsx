import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: ({ context }) => {
    if (context.userId) {
      throw redirect({
        to: "/projects",
      });
    }
  },
});

function Home() {
  const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));

  return (
    <>
      <div className="ml-auto">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
      <div>
        {data.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </div>
    </>
  );
}
