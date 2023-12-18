import { IExtraField } from "@typings/extraField";
import { api }         from ".";

export type IGetExtraField  = IExtraField;
export type IGetExtraFields = IExtraField[];

export interface ICreateExtraFieldRequest {
  extraName ?: string;
  extraValue?: string;
  eventId    : string;
};

export interface IUpdateExtraFieldRequest {
  extraFieldId: string;
  extraName  ?: string;
  extraValue ?: string;
};

export const extraField = api.injectEndpoints({
  endpoints: builder => ({
    createExtraField: builder.mutation<IGetExtraField, ICreateExtraFieldRequest>({
      query: (body) => ({
        method: 'POST',
        url   : `/extraField/create`,
        body,
      }),
      invalidatesTags: ['schedule']
    }),
    updateExtraField: builder.mutation<IGetExtraField, IUpdateExtraFieldRequest>({
      query: ({ extraFieldId, ...body }) => ({
        method: 'POST',
        url   : `/extraField/update/${extraFieldId}`,
        body,
      }),
      invalidatesTags: ['schedule']
    }),
    getAllExtraFields: builder.query<IGetExtraFields, string>({
      query: (eventId) => `/extraField/${eventId}`,
      providesTags: ['schedule']
    }),
    deleteExtraField: builder.mutation<void, string>({
      query: (extraFieldId) => ({
        method: 'DELETE',
        url   : `/extraField/delete/${extraFieldId}`,
      }),
    }),
  }),
});

export const { 
  useCreateExtraFieldMutation,
  useUpdateExtraFieldMutation,
  useGetAllExtraFieldsQuery,
  useDeleteExtraFieldMutation,
} = extraField;