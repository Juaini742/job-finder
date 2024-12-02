import { SECURED_URL } from "@/constant";
import { CompanyValues } from "@/lib/validation";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SECURED_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    addCompany: builder.mutation<{ success: boolean }, CompanyValues>({
      query: (data: CompanyValues) => ({
        url: "/company",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useAddCompanyMutation } = companyApi;
