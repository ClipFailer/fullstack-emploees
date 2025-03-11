import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../app/services/auth'
import { Paths } from '../../../paths'
import { isErrorWithMessage } from '../../../utils/isErrorWithMessage'
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage'
import { Button } from '../../UI/Button/Button'
import { Input } from '../../UI/Input/Input'
import styles from './LoginPage.module.css'

export interface LoginData {
	email: string
	password: string
}

export default function LoginPage() {
	const navigate = useNavigate()

	const { register, handleSubmit, formState } = useForm<LoginData>({
		mode: 'onChange',
	})

	const [error, setError] = useState('')
	const [isErrorModalActive, setIsErrorModalActive] = useState(false)

	const emailError = formState.errors['email']?.message
	const passwordError = formState.errors['password']?.message

	const [loginUser, loginUserResult] = useLoginMutation()

	const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
		try {
			await loginUser(data).unwrap()
			navigate(Paths.home)
		} catch (error) {
			const canBeError = isErrorWithMessage(error)

			if (canBeError) setError(error.data.message)
			else setError('Неизвестная ошибка')

			setIsErrorModalActive(true)
		}
	}

	return (
		<div className={styles.loginPage}>
			<form
				action="POST"
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className={styles.formTitle}>Вход</h2>
				<div>
					<Input
						type="text"
						placeholder="Email"
						error={emailError ? true : false}
						register={{
							...register('email', {
								required: 'Это поле обязательно',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,3}$/i,
									message: 'Некорректная почта',
								},
							}),
						}}
					/>
					{emailError && <span className={styles.error}>{emailError}</span>}
				</div>
				<div>
					<Input
						type="password"
						placeholder="Пароль"
						error={passwordError ? true : false}
						register={{
							...register('password', {
								required: 'Это поле обязательно',
								minLength: {
									value: 6,
									message: 'Пароль не может быть менее 6-ти символов',
								},
							}),
						}}
					/>
					{passwordError && (
						<span className={styles.error}>{passwordError}</span>
					)}
				</div>
				<div>
					<h4 className={styles.regRef}>
						Ещё не зарегистрированы ?{' '}
						<Link to={Paths.register} style={{ color: '#7171f8' }}>
							Зарегистрироваться
						</Link>
					</h4>
					{isErrorModalActive ? <ErrorMessage message={error} /> : ''}
					<Button type={'submit'}>Войти</Button>
				</div>
			</form>
		</div>
	)
}
