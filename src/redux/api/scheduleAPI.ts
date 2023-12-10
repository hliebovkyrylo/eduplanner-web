import { ISchedule } from "../../typings/schedule";
import { api }       from '@redux/api/index';

export type IGetScheduleResponse  = ISchedule;
export type IGetSchedulesResponse = ISchedule[];

export interface ICreateScheduleRequest {
  scheduleName  : string;
  authorId      : string;
  authorUsername: string;
};

export interface IUpdateScheduleRequest {
  scheduleId  : string;
  scheduleName: string;
  isPublic    : boolean;
};

export const scheduleAPI = api.injectEndpoints({
  endpoints: builder => ({
    createSchedule: builder.mutation<IGetScheduleResponse, ICreateScheduleRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/schedule/create',
        body,
      }),
    }),
    updateSchedule: builder.mutation<IGetScheduleResponse, IUpdateScheduleRequest>({
      query: ({scheduleName, isPublic, scheduleId}) => ({
        method: 'PATCH',
        url   : `/schedule/update/${scheduleId}`,
        body  : { scheduleName, isPublic },
      }),
    }),
    getSchedule: builder.query<IGetScheduleResponse, string>({
      query: (scheduleId) => `/schedule/${scheduleId}`,
      providesTags: ['schedule']
    }),
    getAllUserSchedules: builder.query<IGetSchedulesResponse, void>({
      query: () => '/schedule/getAll',
      providesTags: ['schedule']
    }),
    deleteSchedule: builder.mutation<void, string>({
      query: (scheduleId) => ({
        method: 'DELETE',
        url: `/schedule/delete/${scheduleId}`
      }),
    }),
  }),
});

export const  {
  useGetScheduleQuery,
  useGetAllUserSchedulesQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleAPI;