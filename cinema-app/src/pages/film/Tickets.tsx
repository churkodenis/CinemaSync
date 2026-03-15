import { useGetProfileQuery, useGetFilmsQuery } from "@/store/api/userApi";
import MaxWidthWrapper from "@/layouts/MaxWidthWrapper";
import Card from "@/components/ui/card";
import { Ticket, Film as FilmIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Tickets() {
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery();

  const { data: allFilms, isLoading: isFilmsLoading } = useGetFilmsQuery();

  const isLoading = isProfileLoading || isFilmsLoading;

  const bookedFilms = allFilms?.filter((film) =>
    profileData?.User?.tickets?.includes(film.id),
  );

  if (isLoading) {
    return (
      <MaxWidthWrapper className="py-10 flex justify-center items-center h-[40vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-full">
          <Ticket className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">Мої квитки</h1>
          <p className="text-muted-foreground">
            Фільми, на які ви забронювали місця
          </p>
        </div>
      </div>

      {bookedFilms && bookedFilms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedFilms.map((film) => (
            <Link
              key={film.id}
              to={`/Films/${film.id}`}
              className="transition-transform hover:scale-[1.02]"
            >
              <Card item={film} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-gray-50/50">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <FilmIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            У вас ще немає заброньованих квитків
          </h3>
          <p className="text-gray-500 mt-2 mb-6 text-center max-w-xs">
            Перейдіть до афіші, щоб обрати цікавий сеанс.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full px-8">
              Переглянути афішу
            </Button>
          </Link>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
