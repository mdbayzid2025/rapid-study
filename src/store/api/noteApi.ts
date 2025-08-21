import { baseApi } from './baseApi';



export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: (params) => ({
        url: '/notes',
        params,
      }),
      transformResponse: (res: {data : any})=> res?.data,
      providesTags: ['Note'],
    }),
    getNote: builder.query({
      query: (id) => `/notes/${id}`,
      providesTags: ['Note'],
    }),
    createNote: builder.mutation({
      query: (noteData) => ({
        url: '/notes',
        method: 'POST',
        body: noteData,
      }),
      invalidatesTags: ['Note', 'Subject'],
    }),
    updateNote: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;