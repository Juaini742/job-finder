import { BASE_URL } from "@/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["User", "Cv", "Application", "Company", "Job"],
  endpoints: () => ({}),
});
