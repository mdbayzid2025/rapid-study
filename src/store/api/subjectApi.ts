import { baseApi } from "./baseApi"; // Assuming baseApi is already defined

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all subjects
    getSubjects: build.query({
      query: () => ({
        url: "/subjects", 
      }),
      transformResponse: (res: {data: any}) => res?.data,
      providesTags: ["Subject", "Event"],
    }),

    // Get a single subject
    getSubject: build.query({
      query: (id) => ({        
        url: `/subjects/${id}`, 
      }),
      transformResponse: (res: {data:any})=> res?.data,
      providesTags: ["Subject"],
    }),

    // Create a new subject
    createSubject: build.mutation({
      query: (data) => ({
        url: "/subjects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subject"], 
    }),

    // Update an existing subject
    updateSubject: build.mutation({
      query: ({ id, data }) => ({
        url: `/subjects/${id}`,
        method: "PATCH",
        body: data, 
      }),
      invalidatesTags: ["Subject"], 
    }),

    // Delete a subject
    deleteSubject: build.mutation<void, string>({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subject"], 
    }),


    // ------------------- Semester --------------------
    createSemester: build.mutation({
      query: (data)=>({
        url: "/semesters",
        method: "POST",
        body: data,
      })
    }),

    getSemester: build.query({
      query: ()=>`/semesters`,
      transformResponse: (res: {data: any}) => res?.data
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,

  useCreateSemesterMutation,
  useGetSemesterQuery,
} = subjectApi;
