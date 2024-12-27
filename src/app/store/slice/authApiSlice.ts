// services/authApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken, getToken } from '../../../features/tokenService'
import { setUserId } from './userSlice' // Импортируйте action для установки userId
import { AppDispatch } from '../store' // Импортируйте тип Dispatch

interface LoginResponse {
	accessToken: string
	userId: string // Добавьте поле userId
}

interface RegisterResponse {
	accessToken: string // Если при регистрации вы также получаете токен
	userId: string // Добавьте поле userId
}

export const authApiSlice = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	endpoints: builder => ({
		login: builder.mutation<
			LoginResponse,
			{ username: string; password: string }
		>({
			query: ({ username, password }) => ({
				url: 'auth/login',
				method: 'POST',
				body: { username, password },
				credentials: 'include',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					setToken(data.accessToken) // Устанавливаем токен в куки
					dispatch(setUserId(data.userId)) // Сохраняем ID пользователя в состояние
				} catch (error) {
					console.error('Login failed:', error)
				}
			},
		}),
		register: builder.mutation<
			RegisterResponse,
			{ username: string; password: string; email?: string }
		>({
			query: ({ username, password, email }) => ({
				url: 'auth/registration',
				method: 'POST',
				body: { username, password, email },
				credentials: 'include',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					setToken(data.accessToken) // Устанавливаем токен в куки
					dispatch(setUserId(data.userId)) // Сохраняем ID пользователя в состояние
				} catch (error) {
					console.error('Registration failed:', error)
				}
			},
		}),
		me: builder.query({
			query: () => ({
				url: '/auth/me',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: 'include',
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useMeQuery } =
	authApiSlice

export default authApiSlice.reducer
