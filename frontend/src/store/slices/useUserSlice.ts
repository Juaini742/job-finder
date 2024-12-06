import { CommonResponse, UserInterface } from "@/lib/interface";
import { SignInValeus, SignUpValeus } from "@/lib/validation";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<CommonResponse<UserInterface>, void>({
      query: () => "/secured/user",
      providesTags: ["User"],
    }),

    signUp: builder.mutation<CommonResponse<UserInterface>, SignUpValeus>({
      query: (data: SignUpValeus) => ({
        url: "/public/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    signIn: builder.mutation({
      query: (data: SignInValeus) => ({
        url: "/public/auth/login",
        method: "POST",
        body: data,
        invalidatesTags: ["User"],
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/secured/user/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
} = userApi;
