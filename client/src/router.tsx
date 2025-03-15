import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Employee } from './components/Pages/Employee/Employee'
import { Employees } from './components/Pages/Employees/Employees'
import LoginPage from './components/Pages/LoginPage/LoginPage'
import RegisterPage from './components/Pages/RegisterPage/RegisterPage'
import { Paths } from './paths'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: Paths.home,
				element: <Employees />,
			},
			{
				path: Paths.login,
				element: <LoginPage />,
			},
			{
				path: Paths.register,
				element: <RegisterPage />,
			},
			{
				path: `${Paths.employee}/:id`,
				element: <Employee />,
			},
		],
	},
])
