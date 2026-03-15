import { useState } from "react";
import { useGetFilmsQuery } from "@/store/api/filmsApi";
import { Film } from "@/types";

const useSearchFilms = () => {
  const { data: FilmsData, isLoading, isError } = useGetFilmsQuery();
  const [searchResults, setSearchResults] = useState<Film[]>([]);

  const searchFilms = (query: string) => {
    if (!FilmsData || !Array.isArray(FilmsData)) {
      setSearchResults([]);
      return;
    }

    const filteredFilms = FilmsData.filter(
      (Film) =>
        Film.title.toLowerCase().includes(query.toLowerCase()) ||
        Film.description.toLowerCase().includes(query.toLowerCase()) ||
        Film.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        ),
    );

    setSearchResults(filteredFilms);
  };

  return { searchFilms, searchResults, isLoading, isError };
};

export default useSearchFilms;
