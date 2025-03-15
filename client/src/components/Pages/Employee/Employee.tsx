import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectEmployees } from '../../../features/employees/employeesSlice'

import { useState } from 'react'
import { EditEmployeeModal } from '../../EditEmployeeModal/EditEmployeeModal'
import { Button } from '../../UI/Button/Button'
import styles from './Employee.module.scss'

export const Employee = () => {
	const params = useParams()
	const { employees } = useSelector(selectEmployees)
	const employee = employees?.find(e => e.id === params.id)
	const [isEditModalActive, setIsEditModalActive] = useState(false)

	const edit = () => {
		setIsEditModalActive(true)
	}

	return (
		<div className={styles.employee}>
			<h2 className={styles.title}>
				Работник {employee?.firstName} {employee?.lastName}
			</h2>
			<div className={styles.properties}>
				<h3 className={styles.property}>
					Имя: <span className={styles.value}>{employee?.firstName}</span>
				</h3>
				<h3 className={styles.property}>
					Фамилия: <span className={styles.value}>{employee?.lastName}</span>
				</h3>
				<h3 className={styles.property}>
					Возраст: <span className={styles.value}>{employee?.age}</span>
				</h3>
				<h3 className={styles.property}>
					Адрес: <span className={styles.value}>{employee?.address}</span>
				</h3>
			</div>

			<div className={styles.btns}>
				<Button onClick={() => setIsEditModalActive(true)}>
					Редактировать
				</Button>
				<Button>Удалить</Button>
			</div>

			{isEditModalActive && (
				<EditEmployeeModal
					title="Редактирование сотрудника"
					employee={employee}
					closeModal={() => setIsEditModalActive(false)}
				/>
			)}
		</div>
	)
}
