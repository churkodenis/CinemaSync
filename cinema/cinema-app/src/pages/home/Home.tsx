import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useGetFilmsQuery } from "@/store/api/filmsApi";

export default function Home() {
  const { data: films, isLoading } = useGetFilmsQuery();

  if (isLoading) {
    return <div className="text-center py-10">Завантаження фільмів...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
        Афіша фільмів
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films?.map((film) => (
          <Link to={`/films/${film.id}`} key={film.id}>
            <div className="bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
              <img
                src={film.imageUrl || "/placeholder.jpg"}
                alt={film.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white line-clamp-2">
                  {film.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {film.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-primary">{film.price} грн</p>
                  <p className="text-sm text-muted-foreground">{film.time}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {film.tags?.slice(0, 3).map((tag, index) => (
                    <Badge key={`${tag}-${index}`} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}