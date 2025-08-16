import { baseApi } from './baseApi';

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  classId: string;
  tags: string[];
  attachments: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

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
    getNote: builder.query<Note, string>({
      query: (id) => `/notes/${id}`,
      providesTags: ['Note'],
    }),
    createNote: builder.mutation<Note, Partial<Note>>({
      query: (noteData) => ({
        url: '/notes',
        method: 'POST',
        body: noteData,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, { id: string; data: Partial<Note> }>({
      query: ({ id, data }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<void, string>({
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