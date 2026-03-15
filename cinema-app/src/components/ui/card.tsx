
import { Film } from "@/types";
import { Badge } from "./badge";
import { Clock, Users } from "lucide-react";

type CardProps = {
  item: Film;
};

export default function Card({ item }: CardProps) {
  const { title, description, tags, duration, places, createdAt } = item;

  return (
    <div className="rounded-xl w-full p-7 border bg-white hover:shadow-md transition-shadow flex flex-col gap-3">
      <div>
        <h2 className="text-2xl font-bold text-primary line-clamp-1">{title}</h2>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <p className="text-gray-600 line-clamp-2">{description}</p>

      <div className="flex flex-col gap-2 pt-2 border-t mt-auto">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4 text-primary" /> {duration} хв.
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <Users className="w-4 h-4 text-primary" /> {places} місць
          </p>
        </div>
        
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Додано: {createdAt}
        </p>
      </div>
    </div>
  );
}
