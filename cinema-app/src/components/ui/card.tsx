<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
import { Film } from "@/types";
import { Badge } from "./badge";
import { Clock, Users } from "lucide-react";

type CardProps = {
  item: Film;
};

export default function Card({ item }: CardProps) {
  const { title, description, tags, duration, places, createdAt } = item;

  return (
<<<<<<< HEAD
    <div className="rounded-xl w-full p-7 border 
      bg-white dark:bg-zinc-800 
      border-border dark:border-zinc-700
      hover:shadow-md transition-shadow flex flex-col gap-3">
=======
    <div className="rounded-xl w-full p-7 border bg-white hover:shadow-md transition-shadow flex flex-col gap-3">
>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
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

<<<<<<< HEAD
      <p className="text-gray-600 dark:text-zinc-300 line-clamp-2">{description}</p>

      <div className="flex flex-col gap-2 pt-2 border-t border-border dark:border-zinc-700 mt-auto">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="w-4 h-4 text-primary" /> {duration} хв.
          </p>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="w-4 h-4 text-primary" /> {places} місць
          </p>
        </div>
=======
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
        
>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Додано: {createdAt}
        </p>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
