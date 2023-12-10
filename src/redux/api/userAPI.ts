import { IUser } from "../../typings/user";
import { api }   from '@redux/api/index';

export type IGetUserRespose = IUser;

export interface UploadImageRequest extends FormData {};

export interface UploadImageResponse {
  imageUrl: string;
};

export const userAPI = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<IGetUserRespose, void>({
      query: () => ({
        url: '/user/getMe'
      })
    }),
    uploadImage: builder.mutation<UploadImageResponse, UploadImageRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/user/image/upload',
        body,
      }),
    }),
  }),
});

export const { 
  useGetUserQuery, 
  useUploadImageMutation 
} = userAPI;