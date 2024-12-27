import Cookies from 'js-cookie' // Импортируем библиотеку для работы с куками

const TOKEN_KEY = 'auth_token'

export const setToken = (token: string) => {
	Cookies.set(TOKEN_KEY, token, { expires: 1 }) // Сохраняем токен в куки на 1 день
}
export const getToken = () => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${TOKEN_KEY}=`)
	if (parts.length === 2) {
		return parts.pop()?.split(';').shift() || undefined // Используем оператор опциональной цепочки
	}
	return undefined // Явно возвращаем undefined, если кука не найдена
}


export const removeToken = () => {
	Cookies.remove(TOKEN_KEY) // Удаляем токен из куки
}

export const isTokenExpired = (token: string | null): boolean => {
	if (!token) return true

	const payload = JSON.parse(atob(token.split('.')[1]))
	const expirationTime = payload.exp * 1000
	return Date.now() >= expirationTime
}
