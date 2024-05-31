import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper';
import { LoginFormValues } from '@/schemas/auth.schema';

const reducerPath = 'auth/api' as const;
const tagTypes = ['Auth', 'User'];

export const authApi = createApi({
	reducerPath,
	tagTypes,
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		login: build.mutation<any, LoginFormValues>({
			query: (payload) => {
				return { url: '/login', method: 'POST', data: payload };
			},
			onQueryStarted: async (_, { queryFulfilled }) => {
				const { data } = await queryFulfilled;
				const accessToken = data?.access_token;
				localStorage.setItem('access_token', `Bearer ${accessToken}`);
			}
		})
	})
});

export const { useLoginMutation } = authApi;
