import { baseApi } from './baseApi';


export const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: (params) => ({
        url: '/todos',
        params,
      }),
      providesTags: ['ToDo'],
    }),
    getToDo: builder.query({
      query: (id) => `/todos/${id}`,
      providesTags: ['ToDo'],
    }),
    createToDo: builder.mutation({
      query: (todoData) => ({
        url: '/todos',
        method: 'POST',
        body: todoData,
      }),
      invalidatesTags: ['ToDo', 'Subject'],
    }),
    updateToDo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ToDo', 'Subject'],
    }),
    deleteToDo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ToDo'],
    }),
  }),
});

export const {
  useGetToDosQuery,
  useGetToDoQuery,
  useCreateToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} = todosApi;
