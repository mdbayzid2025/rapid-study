import { baseApi } from './baseApi';

export interface Task {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  userId: string;
  createdAt: string;
}

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: '/todos',        
      }),
      transformResponse: (res: {data: any})=> res?.data,
      providesTags: ['Task'],
    }),
    getTask: builder.query({
      query: (id) => `/todos/${id}`,
      providesTags: ['Task'],
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url: '/todos',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Task', 'Stats'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;