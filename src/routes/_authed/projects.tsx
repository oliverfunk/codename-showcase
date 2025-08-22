import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/composite/ProjectCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, List, Filter } from "lucide-react";

// Mock data for demonstration
const mockProjects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400",
    author: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b13c?w=100",
    },
    tags: ["React", "Tailwind", "Portfolio"],
    likes: 24,
    collaborators: 1,
    lastModified: "2 days ago",
    isOwned: true,
  },
  {
    title: "E-commerce Dashboard",
    description:
      "Analytics dashboard for e-commerce platforms with real-time data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    author: {
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    tags: ["Dashboard", "Analytics", "Vue.js"],
    likes: 156,
    collaborators: 3,
    lastModified: "1 week ago",
  },
  {
    title: "Mobile Banking App",
    description: "Complete mobile banking application with modern UI/UX",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
    author: {
      name: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    tags: ["React Native", "FinTech", "Mobile"],
    likes: 89,
    collaborators: 2,
    lastModified: "3 days ago",
  },
  {
    title: "Task Management Tool",
    description:
      "Collaborative task management with team features and integrations",
    author: {
      name: "Mike Thompson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    tags: ["Productivity", "Collaboration", "Next.js"],
    likes: 67,
    collaborators: 4,
    lastModified: "5 days ago",
    isOwned: true,
  },
];

const discoverProjects = [
  {
    title: "3D Product Visualizer",
    description: "Interactive 3D product showcase for e-commerce websites",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    author: {
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    tags: ["Three.js", "WebGL", "E-commerce"],
    likes: 234,
    collaborators: 5,
    lastModified: "1 day ago",
  },
  {
    title: "AI Chat Assistant",
    description:
      "Smart chat assistant with natural language processing capabilities",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400",
    author: {
      name: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    },
    tags: ["AI", "NLP", "Python"],
    likes: 178,
    collaborators: 3,
    lastModified: "4 hours ago",
  },
];

export const Route = createFileRoute("/_authed/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>My Projects</h1>
          <p className="text-muted-foreground">
            Manage and organize your project portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Select defaultValue="modified">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modified">Last Modified</SelectItem>
              <SelectItem value="created">Date Created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button variant="ghost" size="sm" className="border-0">
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="border-0">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="owned">Owned by me</TabsTrigger>
          <TabsTrigger value="shared">Shared with me</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="owned" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProjects
              .filter((p) => p.isOwned)
              .map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="shared" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProjects
              .filter((p) => !p.isOwned)
              .map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
