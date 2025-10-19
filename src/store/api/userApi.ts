import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (updates) => ({
        url: "/users/profile",
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
