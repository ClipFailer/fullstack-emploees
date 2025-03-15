import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'

import { useSelector } from 'react-redux'
import { useAddEmployeeMutation } from '../../app/services/employees'
import { selectUser } from '../../features/auth/authSlice'
import styles from './EmployeeModal.module.scss'

interface Props {
	title?: string
	closeModal: () => void
}

interface Employee {
	firstName: string
	lastName: string
	age: string
	address: string
	userId: string
}

export const EmployeeModal = ({ title, closeModal }: Props) => {
	const { register, handleSubmit, formState } = useForm<Employee>({
		mode: 'onChange',
	})

	const [addEmployee, addEmployeeResult] = useAddEmployeeMutation()
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
				await addEmployee(data)
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
					register={{
						...register('address', {
							required: 'Это поле обязательно',
						}),
					}}
				/>
				{addressErr && <span className={styles.error}>{addressErr}</span>}
				<Button type="submit">Добавить</Button>
			</form>
		</Modal>
	)
}
