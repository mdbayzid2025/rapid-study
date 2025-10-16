// services/calendarApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';

export const settingApi = baseApi.injectEndpoints({
endpoints: (builder) => ({
    getCalanderData: builder.query({
      query: () => '/calendar',
      providesTags: ['Assignment', 'Event', 'Subject', 'Class'],
    }),

    getScheduleData: builder.query({
      query: (id) => `/calendar/${id}`,      
    }),
    getNotice: builder.query({
      query: (id) => `/notice`,      
    }),

    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: '/',
        method: 'POST',
        body: newEvent,
      }),
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/${eventId}`,
        method: 'DELETE',
      }),
    }),
  }),      
});

export const { useGetCalanderDataQuery, useGetNoticeQuery, useGetScheduleDataQuery, useAddEventMutation, useDeleteEventMutation } = settingApi;
