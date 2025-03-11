import { User } from '@prisma/client'
import { api } from './api'

export type UserData = Omit<User, 'id'>
export type UserLoginData = Omit<UserData, 'name'>
type responseData = User & { token: string }

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<responseData, UserLoginData>({
			query: userData => ({
				url: '/users/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: builder.mutation<responseData, UserData>({
			query: userData => ({
				url: '/users/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: builder.query<responseData, void>({
			query: () => ({
				url: '/users/current',
				method: 'GET',
			}),
		}),
	}),
})

export const { useLoginMutation, useCurrentQuery, useRegisterMutation } =
	authApi

export const {
	endpoints: { login, register, current },
} = authApi
