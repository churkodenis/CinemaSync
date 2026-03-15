import { Film, FilmDetails } from "@/types";
import { appApi } from "./appApi";

export type CreateFilmPayload = {
  title: string;
  description: string;
  duration: number;
  places: number;
  time: string;
  price: string;
  tags: string[];
  imageUrl?: string;
};

export const FilmsApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getFilms: build.query<Film[], void>({
      query: () => ({
        url: "films",
        method: "GET",
      }),
      providesTags: ["Films"],
    }),
    getFilmById: build.query<FilmDetails, string>({
      query: (id) => ({
        url: `films/${id}`,
        method: "GET",
      }),
    }),
    createFilm: build.mutation<Film, CreateFilmPayload>({
      query: (film) => ({
        url: "films",
        method: "POST",
        body: film,
      }),
      invalidatesTags: ["Films"],
    }),
    deleteFilm: build.mutation<void, string>({
      query: (id) => ({
        url: `films/${id}`,  // ✅ исправлено
        method: "DELETE",
      }),
      invalidatesTags: ["Films"],
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetFilmByIdQuery,
  useCreateFilmMutation,
  useDeleteFilmMutation,
} = FilmsApi;