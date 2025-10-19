import { baseApi } from './baseApi';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  contact: string;
  idNo: string;
  profession: string;
  bloodGroup: string;  
  address: {
    area: string;
    thana: string;
    district: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    mobile: string;
    address: string;
  };
  profileImage?: string;
  coverImage?: string;
  verified: boolean;
  isDeleted: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;