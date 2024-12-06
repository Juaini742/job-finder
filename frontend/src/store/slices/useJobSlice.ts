import { CommonResponse, JobInterface } from "@/lib/interface";
import { JobValeus } from "@/lib/validation";
import { apiSlice } from "./apiSlice";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobById: builder.query<CommonResponse<JobInterface>, string>({
      query: (id: string | undefined) => ({
        url: `/secured/job/${id}`,
        method: "GET",
      }),
      providesTags: ["Job", "User", "Cv"],
    }),
    getJob: builder.query<CommonResponse<JobInterface[]>, void>({
      query: () => "/secured/job",
      providesTags: ["Job", "User", "Cv"],
    }),
    getJobByUser: builder.query<CommonResponse<JobInterface[]>, void>({
      query: () => "/secured/job/user",
      providesTags: ["Job", "User", "Cv"],
    }),
    addJob: builder.mutation<CommonResponse<JobInterface>, JobValeus>({
      query: (data: JobValeus) => ({
        url: "/secured/job",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetJobQuery,
  useGetJobByIdQuery,
  useGetJobByUserQuery,
  useAddJobMutation,
} = jobApi;
