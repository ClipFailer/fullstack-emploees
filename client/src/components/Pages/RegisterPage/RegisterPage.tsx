import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserData, useRegisterMutation } from '../../../app/services/auth'
import { Paths } from '../../../paths'
import { Button } from '../../UI/Button/Button'
import { Input } from '../../UI/Input/Input'
import styles from './RegisterPage.module.css'

export interface RegisterData {
	email?: string
	password?: string
	confirmPassword?: string
	name?: string
}

export default function RegisterPage() {
	const { register, handleSubmit, formState, watch } = useForm<RegisterData>({
		mode: 'onChange',
	})

	const navigate = useNavigate()

	const [registerUser, registerUserResult] = useRegisterMutation()

	const password = watch('password')

	const emailError = formState.errors['email']?.message
	const nameError = formState.errors['name']?.message
	const passwordError = formState.errors['password']?.message
	const confirmPasswordError = formState.errors['confirmPassword']?.message

	const onSubmit: SubmitHandler<RegisterData> = async data => {
		try {
			delete data.confirmPassword
			await registerUser(data as UserData)
			navigate(Paths.home)

			console.log(data)
		} catch (error) {}
	}

	return (
		<div className={styles.registerPage}>
			<form
				action="POST"
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className={styles.formTitle}>Регистрация</h2>
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
						type="text"
						placeholder="Имя"
						error={nameError ? true : false}
						register={{
							...register('name', {
								required: 'Это поле обязательно',
							}),
						}}
					/>
					{nameError && <span className={styles.error}>{nameError}</span>}
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
					<Input
						type="password"
						placeholder="Подтверждение пароля"
						error={confirmPasswordError ? true : false}
						register={{
							...register('confirmPassword', {
								required: 'Это поле обязательно',
								validate: value => value === password || 'Пароли не совпадают',
							}),
						}}
					/>
					{confirmPasswordError && (
						<span className={styles.error}>{confirmPasswordError}</span>
					)}
				</div>

				<div>
					<h4 className={styles.loginRef}>
						Уже зарегистрированы ?{' '}
						<Link to={Paths.login} style={{ color: '#7171f8' }}>
							Войти
						</Link>
					</h4>

					<Button type={'submit'}>Зарегистрироваться</Button>
				</div>
			</form>
		</div>
	)
}
