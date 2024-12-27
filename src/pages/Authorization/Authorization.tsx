import React, { useState, useEffect } from 'react'
import classesLogin from './Authorization.module.css'
import loginIco from '../../app/assets/login_ico.png'
import passwordIco from '../../app/assets/password_ico.png'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getToken } from '../../features/tokenService'

import {
	useLoginMutation,
	useRegisterMutation,
} from '../../app/store/slice/authApiSlice'

const Login: React.FC = () => {
	const location = useLocation()
	const isLoginPage = location.pathname === '/login'
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [login, { error }] = useLoginMutation()
	const [register] = useRegisterMutation()
	const navigate = useNavigate()

	useEffect(() => {
		if (getToken()) {
			navigate('/')
		}
	}, [navigate])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			if (isLoginPage) {
				await login({ username, password }).unwrap()
			} else {
				await register({ username, password }).unwrap()
				await login({ username, password }).unwrap()
			}

			window.location.reload()
		} catch (err) {
			console.error('Login failed:', err)
		}
	}

	return (
		<>
			<Helmet>
				<title>{isLoginPage ? 'Вход' : 'Регистрация'} | SRS-Maker</title>
				<meta name='description' content='Страница авторизации' />
			</Helmet>
			<div className={classesLogin.container}>
				<div className={classesLogin.login__block}>
					<form onSubmit={handleSubmit}>
						<div className={classesLogin.form__group}>
							<input
								className={classesLogin.form__field}
								placeholder='Логин'
								name='login'
								id='login'
								required
								onChange={e => setUsername(e.target.value)}
							/>
							<label className={classesLogin.form__label}>Логин</label>
							<img
								src={loginIco}
								alt='login_ico'
								className={classesLogin.login__ico}
							/>
						</div>
						<div className={classesLogin.form__group}>
							<input
								type='password'
								className={classesLogin.form__field}
								placeholder='Пароль'
								name='password'
								id='password'
								onChange={e => setPassword(e.target.value)}
								required
							/>
							<label className={classesLogin.form__label}>Пароль</label>
							<img
								src={passwordIco}
								alt='password_ico'
								className={classesLogin.login__ico}
							/>
						</div>
						{error && (
							<p className={classesLogin.error}>
								{error.data?.message || 'Произошла неизвестная ошибка.'}
							</p>
						)}
						<button
							className={classesLogin.login__btn}
							type='submit'
							id='submit'
						>
							{isLoginPage ? 'Войти' : 'Зарегистрироваться'}
						</button>
						<Link
							to={isLoginPage ? '/signin' : '/login'}
							title='signin'
							className={classesLogin.login__regLink}
						>
							{isLoginPage
								? 'У вас нет аккаунта? Зарегистрироваться'
								: 'У вас уже есть аккаунт? Войти'}
						</Link>
					</form>
				</div>
			</div>
		</>
	)
}

export { Login }
