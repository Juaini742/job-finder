import { CvInterface } from "@/lib/interface";
import { CvValues } from "@/lib/validation";
import { apiSlice } from "./apiSlice";

interface CvResponse {
  status: number;
  metadata: string;
  data: CvInterface;
}

export const cvApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCv: builder.query<CvResponse, void>({
      query: () => "/secured/cv",
      providesTags: ["Cv"],
    }),
    addCv: builder.mutation<CvResponse, CvValues>({
      query: (data: CvValues) => ({
        url: "/secured/cv",
        method: "POST",
        body: data,
      }),
    }),
    updateCv: builder.mutation<CvResponse, CvValues>({
      query: (data: CvValues) => ({
        url: "/secured/cv",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cv"],
    }),
  }),
});

export const { useGetCvQuery, useAddCvMutation, useUpdateCvMutation } = cvApi;
