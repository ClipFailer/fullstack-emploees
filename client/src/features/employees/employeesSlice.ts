import { Employee } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import { employeesApi } from '../../app/services/employees'
import { RootState } from '../../app/store'

interface InitialState {
	employees: Employee[] | null
}

const initialState: InitialState = {
	employees: null,
}

const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		logout: () => initialState,
	},
	extraReducers: builder => {
		builder.addMatcher(
			employeesApi.endpoints.getAllEmployees.matchFulfilled,
			(state, action) => {
				state.employees = action.payload
			}
		)
	},
})

export default employeesSlice.reducer

export const selectEmployees = (state: RootState) => state.employees
