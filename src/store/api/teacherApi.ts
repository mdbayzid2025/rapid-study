import { baseApi } from "./baseApi";


export const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // Get all teachers
    getTeachers: build.query({
      query: () => `/teachers`,
      transformResponse: (res: {data: any}) => res?.data,
      providesTags: ["Teacher"],
    }),

    // Get single teacher
    getTeacher: build.query({
      query: (id) => ({
        url: `/teachers/${id}`,
      }),
      providesTags: ["Teacher"],
    }),

    // Create new teacher
    createTeacher: build.mutation({
      query: (data) => ({
        url: "/teachers",
        method: "POST",
        body: data,
      }),
    //   invalidatesTags: ["Teacher"],
    }),

    // Update teacher
    updateTeacher: build.mutation({
      query: ({ id, data }) => ({
        url: `/teachers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),

    // Delete teacher
    deleteTeacher: build.mutation<void, string>({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),

  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
