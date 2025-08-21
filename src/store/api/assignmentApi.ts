import { baseApi } from "./baseApi";



export const assignmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all assignments
    getAssignments: builder.query({
      query: (params) => ({
        url: "/assignments",
        params,
      }),
      providesTags: ["Assignment"],
    }),

    // Fetch single assignment by ID
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags: ["Assignment"],
    }),

    // Create new assignment
    createAssignment: builder.mutation({
      query: (assignmentData) => ({
        url: "/assignments",
        method: "POST",
        body: assignmentData,
      }),
      invalidatesTags: ["Assignment", "Subject", "Class"],
    }),

    // Update assignment by ID
    updateAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Assignment"],
    }),

    // Delete assignment by ID
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
