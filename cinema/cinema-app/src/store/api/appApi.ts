import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem("userDetails")
      ? JSON.parse(window.localStorage.getItem("userDetails")!).token
      : null;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const appApi = createApi({
  baseQuery,
  reducerPath: "appApi",
  tagTypes: ["Films"],
  endpoints: () => ({}),
});