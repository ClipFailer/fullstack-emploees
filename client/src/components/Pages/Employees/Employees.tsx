import { useGetAllEmployeesQuery } from '../../../app/services/employees'
import { Loader } from '../../Loader/Loader'
import { Button } from '../../UI/Button/Button'

import { Employee } from '@prisma/client'
import { ColumnsType } from 'antd/es/table'
import { FaUserPlus } from 'react-icons/fa6'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../../features/auth/authSlice'
import { Paths } from '../../../paths'
import { EmployeeModal } from '../../EmployeeModal/EmployeeModal'
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
	const [isAddModalActive, setIsAddModalActive] = useState<Boolean>(false)

	useEffect(() => {
		if (!user && !localStorage.getItem('token')) navigate('/login')
	}, [navigate, user])

	return (
		<div>
			{isLoading && <Loader />}

			<div>
				<Button width="120px" onClick={() => setIsAddModalActive(true)}>
					<FaUserPlus /> Добавить
				</Button>
				{isAddModalActive && (
					<EmployeeModal
						title="Добавить сотрудника"
						closeModal={() => setIsAddModalActive(false)}
					/>
				)}
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Фамилия</th>
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
								<td>{e.lastName}</td>
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
