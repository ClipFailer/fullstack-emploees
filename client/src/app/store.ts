import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import auth from '../features/auth/authSlice'
import employees from '../features/employees/employeesSlice'
import { listenerMiddleware } from '../middleware/auth'
import { api } from './services/api'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		auth,
		employees,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(api.middleware)
			.prepend(listenerMiddleware.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
