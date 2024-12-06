import { CompanyValues } from "@/lib/validation";
import { apiSlice } from "./apiSlice";

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCompany: builder.mutation<{ success: boolean }, CompanyValues>({
      query: (data: CompanyValues) => ({
        url: "/secured/company",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useAddCompanyMutation } = companyApi;
