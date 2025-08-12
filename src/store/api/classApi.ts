import { baseApi } from './baseApi';

export interface ClassItem {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  teacherName: string;
  students: string[];
  resources: Resource[];
  createdAt: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  uploadedAt: string;
}

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<ClassItem[], void>({
      query: () => '/classes',
      providesTags: ['Class'],
    }),
    getClass: builder.query<ClassItem, string>({
      query: (id) => `/classes/${id}`,
      providesTags: ['Class'],
    }),
    createClass: builder.mutation<ClassItem, Partial<ClassItem>>({
      query: (classData) => ({
        url: '/classes',
        method: 'POST',
        body: classData,
      }),
      invalidatesTags: ['Class'],
    }),
    updateClass: builder.mutation<ClassItem, { id: string; data: Partial<ClassItem> }>({
      query: ({ id, data }) => ({
        url: `/classes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Class'],
    }),
    deleteClass: builder.mutation<void, string>({
      query: (id) => ({
        url: `/classes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Class'],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;