import React, { useEffect } from 'react'
import classesHeader from './Header.module.css'
import icon from '../../app/assets/icon.svg'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMeQuery } from '../../app/store/slice/authApiSlice'
import { getToken, removeToken } from '../../features/tokenService' // Импортируйте вашу функцию для получения токена

const Header = () => {
	const location = useLocation()
	const isLoginPage = location.pathname === '/login'
	const navigate = useNavigate()

	// Получаем токен из куки
	const token = getToken() // Замените 'auth_token' на имя вашей куки с токеном

	const handleLogout = () => {
		removeToken()
		navigate('/')
	}
	// Запрос к пользовательским данным
	const {
		data: userData,
		error,
		isLoading,
	} = useMeQuery(undefined, {
		skip: !token, // Пропускаем запрос, если токена нет
	})


	return (
		<>
			<header className={classesHeader.container}>
				<Link to='/' aria-label='Главная страница'>
					<img src={icon} alt='icon' className={classesHeader.headerIcon} />
				</Link>
				<ul>
					<li className={classesHeader.navMenu}>
						{!isLoginPage &&
							(userData ? (
								<>
									<Link
										to='myProject'
										className={classesHeader.navLink}
										aria-label='Мои проекты'
									>Мои проекты</Link>
									<button
										onClick={handleLogout}
										className={classesHeader.navLink}
									>
										{userData.username}
									</button>
								</>
							) : (
								<Link
									to='/login'
									className={classesHeader.navLink}
									aria-label='Войти'
								>
									Войти
								</Link>
							))}
					</li>
				</ul>
			</header>
			<Outlet />
		</>
	)
}

export { Header }
