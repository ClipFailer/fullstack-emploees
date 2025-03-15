import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'

import { Employee } from '@prisma/client'
import { useSelector } from 'react-redux'
import { useEditEmployeeMutation } from '../../app/services/employees'
import { selectUser } from '../../features/auth/authSlice'
import styles from '../EmployeeModal/EmployeeModal.module.scss'

interface Props {
	title?: string
	closeModal: () => void
	employee?: Employee
}

export const EditEmployeeModal = ({ title, closeModal, employee }: Props) => {
	const { register, handleSubmit, formState } = useForm<Employee>({
		mode: 'onChange',
	})

	const [editEmployee, editEmployeeResult] = useEditEmployeeMutation()
	const user = useSelector(selectUser)

	const firstNameErr = formState.errors['firstName']?.message
	const lastNameErr = formState.errors['lastName']?.message
	const ageErr = formState.errors['age']?.message
	const addressErr = formState.errors['address']?.message

	const createEmployee: SubmitHandler<Employee> = async (data: Employee) => {
		console.log(data)
		try {
			if (user) {
				data.userId = user.id
				if (employee) data.id = employee.id
				await editEmployee(data)
				console.log(data)
				closeModal()
			}
		} catch (error) {}
	}

	return (
		<Modal title={title} closeModal={closeModal}>
			<form
				action="POST"
				className={styles.employeeForm}
				onSubmit={handleSubmit(createEmployee)}
			>
				<Input
					type="text"
					placeholder="Имя"
					defaultValue={employee?.firstName}
					register={{
						...register('firstName', {
							required: 'Это поле обязательно',
						}),
					}}
				/>
				{firstNameErr && <span className={styles.error}>{firstNameErr}</span>}
				<Input
					type="text"
					placeholder="Фамилия"
					defaultValue={employee?.lastName}
					register={{
						...register('lastName', {
							required: 'Это поле обязательно',
						}),
					}}
				/>
				{lastNameErr && <span className={styles.error}>{lastNameErr}</span>}
				<Input
					type="number"
					placeholder="Возраст"
					defaultValue={employee?.age}
					register={{
						...register('age', {
							required: 'Это поле обязательно',
						}),
					}}
				/>
				{ageErr && <span className={styles.error}>{ageErr}</span>}
				<Input
					type="text"
					placeholder="Адрес"
					defaultValue={employee?.address}
					register={{
						...register('address', {
							required: 'Это поле обязательно',
						}),
					}}
				/>
				{addressErr && <span className={styles.error}>{addressErr}</span>}
				<Button type="submit">Изменить</Button>
			</form>
		</Modal>
	)
}
