import { ISchedulePreview } from "../../typings/schedule";
import { api }              from '@redux/api/index';

export type IVisitedSchedules = ISchedulePreview[];
export type IVisitedSchedule  = ISchedulePreview;

export const visitedApi = api.injectEndpoints({
  endpoints: builder => ({
    getVisitedSchedules: builder.query<IVisitedSchedules, void>({
      query: () => ({
        url: '/visited/getAll'
      }),
      providesTags: ['schedule']
    }),
    removeVisitedSchedule: builder.mutation<void, string>({
      query: (scheduleId) => ({
        method: 'DELETE',
        url   : `/visited/${scheduleId}`,
      })
    }),
  }),
});

export const {
  useGetVisitedSchedulesQuery,
  useRemoveVisitedScheduleMutation,
} = visitedApi;