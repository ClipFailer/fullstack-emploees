import { useGetAllEmployeesQuery } from '../../../app/services/employees'
import { Loader } from '../../Loader/Loader'
import { Button } from '../../UI/Button/Button'

import { Employee } from '@prisma/client'
import { ColumnsType } from 'antd/es/table'
import { FaUserPlus } from 'react-icons/fa6'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../../features/auth/authSlice'
import { Paths } from '../../../paths'
import styles from './Employees.module.scss'

const columns: ColumnsType<Employee> = [
	{ title: 'Имя', dataIndex: 'firstName', key: 'firstName' },
	{ title: 'Возраст', dataIndex: 'age', key: 'age' },
	{ title: 'Адрес', dataIndex: 'address', key: 'address' },
]

export const Employees = () => {
	const { data, isLoading } = useGetAllEmployeesQuery()
	const navigate = useNavigate()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (!user && !isLoading) navigate('/login')
	}, [navigate, user])

	return (
		<div>
			{isLoading && <Loader />}

			<div>
				<Button width="120px">
					<FaUserPlus /> Добавить
				</Button>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Возраст</th>
							<th>Адрес</th>
						</tr>
					</thead>
					<tbody>
						{data?.map(e => (
							<tr
								key={e.id}
								onClick={() => navigate(`${Paths.employee}/${e.id}`)}
							>
								<td>{e.firstName}</td>
								<td>{e.age}</td>
								<td>{e.address}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
