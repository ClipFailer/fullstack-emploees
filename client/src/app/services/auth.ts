import { User } from '@prisma/client'
import { api } from './api'

export type UserData = Omit<User, 'id'>
type responseLoginData = User & { token: string }

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation()
  })
})
