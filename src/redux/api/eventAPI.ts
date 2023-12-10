import { IEvent } from "../../typings/event";
import { api }    from '@redux/api/index';

export type IGetEventResponse     = IEvent;
export type IGetAllEventsResponse = IEvent[];

export interface ICreateEventRequest {
  eventName : string;
  eventTime : string;
  eventColor: string;
  rowNum    : number;
  colNum    : number;
  parentId  : string;
};

export interface IUpdateEventRequest {
  eventId   : string;
  eventName : string;
  eventTime : string;
  eventColor: string;
};

export const eventAPI = api.injectEndpoints({
  endpoints: builder => ({
    createEvent: builder.mutation<IGetEventResponse, ICreateEventRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/event/create',
        body,
      }),
      invalidatesTags: ['schedule']
    }),
    updateEvent: builder.mutation<IGetEventResponse, IUpdateEventRequest>({
      query: ({ eventId, eventName, eventColor, eventTime }) => ({
        method: 'PATCH',
        url   : `/event/${eventId}`,
        body  : {
          eventName,
          eventTime,
          eventColor,
        },
      }),
      invalidatesTags: ['schedule']
    }),
    getEvent: builder.query<IGetEventResponse, string>({
      query: (eventId) => `/event/${eventId}`
    }),
    getAllEvents: builder.query<IGetAllEventsResponse, string>({
      query: (scheduleId) => `/event/getAll/${scheduleId}`
    }),
  }),
});

export const {
  useGetEventQuery,
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
} = eventAPI;