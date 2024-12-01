import { BASE_URL } from "@/constant";
import { SignInValeus, SignUpValeus } from "@/lib/validation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  token: string;
}

interface SignResponse {
  status: number;
  message: string;
  data: UserData;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => "/secured/user",
      providesTags: ["user"],
    }),

    signUp: builder.mutation<SignResponse, SignUpValeus>({
      query: (data: SignUpValeus) => ({
        url: "/public/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    signIn: builder.mutation({
      query: (data: SignInValeus) => ({
        url: "/public/auth/login",
        method: "POST",
        body: data,
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
