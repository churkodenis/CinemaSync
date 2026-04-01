import { useGetFilmsQuery } from "@/store/api/filmsApi";
import FilmWrapper from "@/layouts/MaxWidthWrapper";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopFilmsPage() {
  const { data: films, isLoading, isError } = useGetFilmsQuery();
  const topThreeFilms = films?.slice(0, 3);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-destructive font-medium">
          Помилка завантаження даних
        </p>
      </div>
    );
  }

  return (
    <FilmWrapper className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent mb-2">
            <Sparkles className="w-5 h-5 fill-current" />
            <span className="uppercase tracking-widest text-sm font-bold">
              Recommended
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-primary">Топ-3 Сеанси</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Найпопулярніші фільми тижня, які обов'язково варто переглянути.
          </p>
        </div>

        <Link to="/">
          <Button
            variant="ghost"
            className="group text-primary hover:text-secondary"
          >
            Дивитися всі афіші
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-64 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
              </div>
            ))
          : topThreeFilms?.map((film) => (
              <div key={film.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-secondary rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <Card item={film} />
              </div>
            ))}
      </div>

      {!isLoading && topThreeFilms?.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-xl text-muted-foreground">
            Наразі немає доступних фільмів.
          </p>
        </div>
      )}
    </FilmWrapper>
  );
}
