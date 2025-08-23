import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import Cookies from "js-cookie"
import { getBaseUrl } from '@/urils/baseUrl';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),

  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get("accessToken");  
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['User', 'Class', 'ToDo' ,'Note', 'Assignment', 'Event', 'Task', 'Teacher', 'Stats', 'Subject'],
  endpoints: () => ({}),
});