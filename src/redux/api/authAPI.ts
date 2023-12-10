import { api } from '@redux/api/index';

export interface ISignInRequest {
  email   : string;
  password: string;
};

export interface ISignUpRequest {
  image   : string;
  username: string;
  email   : string;
  password: string;
};

export interface ISignInResponse {
  accessToken: string;
};

export interface ISignUpResponse {
  accessToken: string;
};

export interface ISignOutResponse {
  accessToken: null;
};

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/user/sign-in',
        body
      }),
      invalidatesTags: ['user', 'schedule']
    }),
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/user/sign-up',
        body
      }),
      invalidatesTags: ['user', 'schedule']
    }),
    signOut: builder.mutation<ISignOutResponse, void>({
      queryFn: () => ({
        data: { accessToken: null }
      }),
      invalidatesTags: ['user', 'schedule']
    })
  })
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation
} = authApi;
