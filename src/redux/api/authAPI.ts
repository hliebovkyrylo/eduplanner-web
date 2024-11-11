import { api } from "@redux/api/index";
import { ApiResponse } from "@typings/apiResponse";

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string | null;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, ISignInRequest>({
      query: (body) => ({
        method: "POST",
        url: "/auth/sign-in",
        body,
      }),
      transformResponse: (response: ApiResponse<{ accessToken: string }>) => ({
        accessToken: response.data.accessToken,
      }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation<AuthResponse, ISignUpRequest>({
      query: (body) => ({
        method: "POST",
        url: "/auth/sign-up",
        body,
      }),
      transformResponse: (response: ApiResponse<{ accessToken: string }>) => ({
        accessToken: response.data.accessToken,
      }),
      invalidatesTags: ["user"],
    }),
    signOut: builder.mutation<AuthResponse, void>({
      queryFn: () => ({
        data: { accessToken: null },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  authApi;
