import * as React from "react";
import { ChevronRight, Search, SearchIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import NoResultsImg from "@/assets/no_result.jpg";
import { ScrollArea } from "./ui/scroll-area";
import useSearchFilms from "@/hooks/useSearchFilm";

export default function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { searchFilms, searchResults, isLoading } = useSearchFilms();

  React.useEffect(() => {
    if (search.length > 2) {
      searchFilms(search);
    }
  }, [search]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const renderSearchResultItems = () => {
    if (isLoading) {
      return (
        <p className="text-lg text-muted-foreground flex justify-center gap-2 pt-3">
          Завантаження...
        </p>
      );
    }

    if (!search.length) {
      return (
        <p className="text-lg text-muted-foreground flex justify-center gap-2 pt-3">
          <SearchIcon />
          Почніть пошук...
        </p>
      );
    }

    if (searchResults.length > 0) {
      return (
        <ul className="flex flex-col gap-2 w-full">
          {searchResults.map((item) => (
            <li key={item.id}>
              <Link
                className="flex items-center gap-2 py-2 px-4 w-full 
                  bg-muted hover:bg-muted/70
                  dark:bg-zinc-800 dark:hover:bg-zinc-700
                  rounded-md transition-colors"
                to={`/films/${item.id}`}
                onClick={() => setOpen(false)}
              >
                <ChevronRight className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="text-muted-foreground ml-auto text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.duration} хв.
                </span>
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <p className="text-lg text-muted-foreground">Нічого не знайдено</p>
        <img
          src={NoResultsImg}
          alt="No results"
          className="mt-4 max-w-[150px] opacity-50"
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-3 justify-start text-muted-foreground group"
        >
          <Search className="h-4 w-4 group-hover:scale-125 group-hover:text-primary transition-transform duration-300" />
          Пошук фільмів
          <span className="flex items-center bg-muted px-2 rounded-md group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <span className="text-lg">⌘</span> + K
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-4 dark:bg-zinc-900 dark:border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-foreground">Пошук фільмів</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Введіть назву фільму, яку ви шукаєте
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Назва фільму..."
          value={search}
          onChange={handleSearch}
          className="dark:bg-zinc-800 dark:border-zinc-600 dark:text-white dark:placeholder:text-zinc-400"
        />
        <ScrollArea className="h-[250px] pr-4">
          {renderSearchResultItems()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}