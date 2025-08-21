import { baseApi } from './baseApi';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'exam' | 'assignment' | 'test' | 'field-trip' | 'seminar';
  classId: string;
  className: string;
  date: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
}

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params) => ({
        url: '/events',
        params,
      }),
      providesTags: ['Event'],
    }),
    getEvent: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: ['Event'],
    }),
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: ['Event', 'Subject'],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
    getNotification: builder.query({
      query: ()=>`/notifications`,
      transformResponse: (res: {data: any})=> res?.data
    }),    
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,

  useGetNotificationQuery,
} = eventApi;