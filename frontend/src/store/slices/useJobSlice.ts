import { SECURED_URL } from "@/constant";
import { JobInterface } from "@/lib/interface";
import { JobValeus } from "@/lib/validation";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface JobResponse {
  status: number;
  message: string;
  data: JobInterface[];
}

export const jobApi = createApi({
  reducerPath: "jobApi",
  tagTypes: ["jobs"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${SECURED_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getJobById: builder.query<JobResponse, string>({
      query: (id: string | undefined) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
    }),
    getJob: builder.query<JobResponse, void>({
      query: () => "/job",
      providesTags: ["jobs"],
    }),
    addJob: builder.mutation<JobResponse, JobValeus>({
      query: (data: JobValeus) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetJobQuery, useGetJobByIdQuery, useAddJobMutation } = jobApi;
