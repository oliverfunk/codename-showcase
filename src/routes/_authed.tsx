import { DashboardHeader } from "@/components/composite/DashboardHeader";
import { DashboardSidebar } from "@/components/composite/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: ({ context, params }) => {
    console.log("_authed params:", JSON.stringify(params, null, 2));
    if (!context.userId) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
      <div className="h-screen bg-background flex w-full">
        <DashboardSidebar />
        <div className="flex flex-col flex-1">
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
