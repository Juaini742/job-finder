import {
  ApplicationWithCompanyInterface,
  CommonResponse,
  RequestApplication,
} from "@/lib/interface";
import { apiSlice } from "./apiSlice";

interface CreateResponse {
  userId: string;
  jobId: string;
  status: string;
}

interface AppStatus {
  id: string | undefined;
  status: string;
}

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicatonRecruiter: builder.query<
      CommonResponse<ApplicationWithCompanyInterface[]>,
      void
    >({
      query: () => "/secured/application/recruiter",
      providesTags: ["Application", "User", "Job", "Cv"],
    }),
    getApplicatonByUser: builder.query<
      CommonResponse<ApplicationWithCompanyInterface[]>,
      void
    >({
      query: () => "/secured/application",
      providesTags: ["Application", "User", "Job", "Cv"],
    }),
    addApplication: builder.mutation<
      CommonResponse<CreateResponse>,
      RequestApplication
    >({
      query: (data: RequestApplication) => ({
        url: "/secured/application",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application", "User", "Job", "Cv"],
    }),
    updateStatus: builder.mutation<CommonResponse<CreateResponse>, AppStatus>({
      query: (data: AppStatus) => ({
        url: `/secured/application/${data.id}`,
        method: "PUT",
        body: { status: data.status },
      }),
      invalidatesTags: ["Application"],
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          applicationApi.util.updateQueryData(
            "getApplicatonByUser",
            undefined,
            (draft) => {
              const application = draft.data.find((item) => item.id === id);
              if (application) {
                application.status = status;
              }
            }
          )
        );
        try {
          // Tunggu respons server
          await queryFulfilled;
        } catch (error) {
          console.error("Error updating application status:", error);

          // Rollback state jika ada error
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetApplicatonRecruiterQuery,
  useGetApplicatonByUserQuery,
  useAddApplicationMutation,
  useUpdateStatusMutation,
} = applicationApi;
