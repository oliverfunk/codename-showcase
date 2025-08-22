/// <reference types="vite/client" />
import { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getAuth, clerkClient } from "@clerk/tanstack-react-start/server";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";

import { getWebRequest } from "@tanstack/react-start/server";
import { ConvexReactClient } from "convex/react";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";

import appCss from "../styles/app.css?url";
import { createServerFn } from "@tanstack/react-start";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { App, Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";

// have to redir them to
// https://github.com/apps/showcase-test-app/installations/new

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const auth = await getAuth(getWebRequest(), {});

  const token = await auth.getToken({ template: "convex" });

  const { userId } = auth;

  const oauth = userId
    ? await clerkClient().users.getUserOauthAccessToken(userId, "github")
    : null;

  if (oauth) {
    // const app = new App({
    //   appId: 1713203,
    //   privateKey: a,
    // });
    // const octokit = await app.;
    const octokit = new Octokit({
      // authStrategy: createAppAuth,
      // auth: {
      //   clientId: "Ov23liQ3fmDqg1V8Dm65",
      //   clientSecret: "6e49fe64c84035a4c37541e81e62f1ce4eaa1b00",
      //   appId: 1713203,
      //   privateKey: a,
      //   // installationId: process.env.GITHUB_APP_INSTALLATION_ID,
      // },
    });
    // const b = await octokit.request("/app");
    // console.log("b", JSON.stringify(b.data, null, 2));

    const repoContents = await octokit.rest.repos.getContent({
      owner: "oliverfunk",
      repo: "darknet-rs",
      path: "", // "" for root, or "src" for a folder, or "README.md" for a file
    });
    console.log("repoContents", JSON.stringify(repoContents.data, null, 2));

    // const appres = await app.octokit.request("GET /app");
    // console.log("appres", JSON.stringify(appres.data, null, 2));

    // const appres = await app.octokit.request(
    //   "GET /users/{username}/installation",
    //   {
    //     username: "oliverfunk",
    //     headers: {
    //       "X-GitHub-Api-Version": "2022-11-28",
    //     },
    //   }
    // );

    // const d = appres.data;
    // console.log("appres", JSON.stringify(d, null, 2));

    // const octokit = await app.getInstallationOctokit(80764496);

    // const repoContents = await octokit.request(
    //   "GET /repos/{owner}/{repo}/contents",
    //   {
    //     owner: "oliverfunk",
    //     repo: "oliverfunk-cv",
    //     headers: {
    //       "X-GitHub-Api-Version": "2022-11-28",
    //     },
    //   }
    // );

    // console.log("repoContents", JSON.stringify(repoContents.data, null, 2));

    // const { token } = oauth.data[0];
    // console.log("token:", token);
    // const res = await fetch("https://github.com/login/oauth/access_token", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({
    //     client_id: "Ov23liQ3fmDqg1V8Dm65",
    //     client_secret: "6e49fe64c84035a4c37541e81e62f1ce4eaa1b00",
    //     code: "notright",
    //     redirect_uri:
    //       "https://intense-jaguar-93.clerk.accounts.dev/v1/oauth_callback",
    //   }),
    // });
    // const data = await res.json();
    // console.log("GitHub data:", JSON.stringify(data, null, 2));
  }
  return {
    userId,
    token,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Showcase",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  beforeLoad: async ({ context, params }) => {
    console.log("_root params:", JSON.stringify(params, null, 2));

    const { userId, token } = await fetchClerkAuth();

    // During SSR only (the only time serverHttpClient exists),
    // set the Clerk auth token to make HTTP queries with.
    if (token) {
      context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      userId,
      token,
    };
  },
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const context = useRouteContext({ from: Route.id });
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <html>
          <head>
            <HeadContent />
          </head>
          <body>
            {children}
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
            <Scripts />
          </body>
        </html>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
