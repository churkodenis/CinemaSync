import { appApi } from "./appApi";
import { Film } from "@/types";

export interface ProfileResponse {
  User: {
    id: string;
    username: string;
    email: string;
    roles: string[];
    tickets: string[];
  };
  Authorities: any[];
}

export const UserApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),

    getFilms: build.query<Film[], void>({
      query: () => "/films",
    }),

    bookTicket: build.mutation<{ message: string; tickets: string[] }, string>({
      query: (filmId) => ({
        url: `/auth/book-ticket/${filmId}`,
        method: "POST",
      }),
    }),

    cancelTicket: build.mutation<{ message: string; tickets: string[] }, string>({
      query: (filmId) => ({
        url: `/auth/cancel-ticket/${filmId}`,
        method: "DELETE",
      }),
    }),

    getFilmsByUser: build.query<Film[], string>({
      query: (userId) => `/films/user/${userId}`,
    }),

    changePassword: build.mutation<string, { oldPassword: string; newPassword: string }>({
      query: (dto) => ({
        url: "/auth/change-password",
        method: "POST",
        body: dto,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetFilmsQuery,
  useGetFilmsByUserQuery,
  useBookTicketMutation,
  useCancelTicketMutation,
  useChangePasswordMutation,
} = UserApi;