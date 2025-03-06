import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Paths } from '../../../paths'
import { Button } from '../../UI/Button/Button'
import { Input } from '../../UI/Input/Input'
import styles from './LoginPage.module.css'

export interface LoginData {
	email: string
	password: string
}

export default function LoginPage() {
	const { register, handleSubmit, formState } = useForm<LoginData>({
		mode: 'onChange',
	})

	const emailError = formState.errors['email']?.message
	const passwordError = formState.errors['password']?.message

	const onSubmit: SubmitHandler<LoginData> = data => {
		console.log(data)
	}

	return (
		<div className={styles.loginPage}>
			<h1 className={styles.formTitle}>Вход</h1>
			<form
				action="POST"
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
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
				{passwordError && <span className={styles.error}>{passwordError}</span>}
				<h4 className={styles.regRef}>
					Ещё не зарегистрированы ?{' '}
					<Link to={Paths.register} style={{ color: '#7171f8' }}>
						Зарегистрироваться
					</Link>
				</h4>

				<Button type={'submit'}>Войти</Button>
			</form>
		</div>
	)
}
