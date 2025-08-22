import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Star, Users } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  likes: number;
  collaborators: number;
  lastModified: string;
  isOwned?: boolean;
}

export const ProjectCard = ({
  title,
  description,
  image,
  author,
  tags,
  likes,
  collaborators,
  lastModified,
  isOwned = false,
}: ProjectCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 bg-card border border-border overflow-hidden">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {image ? (
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-150"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
            <div className="text-muted-foreground">No preview</div>
          </div>
        )}
        {isOwned && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-card-foreground line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="text-xs">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {likes}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {collaborators}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Modified {lastModified}
        </div>
      </div>
    </Card>
  );
};
