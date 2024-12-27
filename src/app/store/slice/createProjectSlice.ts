// slice/createProjectSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Project {
	id: string // Замените на ObjectId, если используете Mongoose
	title: string
	createdAt: string // Замените на Date, если хотите хранить как объект Date
}

export const createProjectApi = createApi({
	reducerPath: 'createProjectApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	endpoints: builder => ({
		createProject: builder.mutation({
			query: newProject => ({
				url: 'projects',
				method: 'POST',
				body: newProject,
				credentials: 'include',
			}),
		}),
		getUserProjects: builder.query<Project[], void>({
			// Указываем, что возвращается массив проектов
			query: () => 'projects', // Эндпоинт для получения проектов
		}),
	}),
})

// Генерация хуков для использования в компонентах
export const { useCreateProjectMutation, useGetUserProjectsQuery } =
	createProjectApi

export default createProjectApi.reducer
