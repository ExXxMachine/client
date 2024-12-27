import React from 'react'
import { ProjectCard } from '../ProjectCard/ProjectCard'
import classesProjectList from './ProjectList.module.css'
import { FuncBtn } from '../../shared/authShared'
import { Helmet } from 'react-helmet'
import { getToken } from '../../features/tokenService'
import { Navigate } from 'react-router-dom'
import {
	useCreateProjectMutation,
	useGetUserProjectsQuery,
} from '../../app/store/slice/createProjectSlice' // Импортируйте хуки из вашего API slice
import { useSelector } from 'react-redux' // Импортируйте useSelector
import { RootState } from '../../app/store/store' // Импортируйте тип RootState

const ProjectList = () => {
	const token = getToken()
	const userId = useSelector((state: RootState) => state.user.userId) // Получите userId из состояния Redux
	const [createProject] = useCreateProjectMutation() // Получите хук для создания проекта

	// Используйте хук для получения проектов
	const { data: projects = [], error, isLoading } = useGetUserProjectsQuery() // Инициализируем projects пустым массивом

	if (!token) {
		return <Navigate to='/login' replace />
	}

	const handleCreateProject = async () => {
		const newProject = {
			title: 'Project', // Фиксированное название проекта
			userId: userId, // Используйте userId из состояния Redux
		}

		try {
			await createProject(newProject).unwrap() // Выполните запрос на создание проекта
			alert('Проект успешно создан!') // Уведомление об успешном создании
		} catch (error) {
			console.error('Ошибка при создании проекта:', error)
			alert('Ошибка при создании проекта')
		}
	}

	if (isLoading) {
		return <div>Загрузка проектов...</div> // Показать индикатор загрузки
	}

	if (error) {
		return <div>Ошибка при получении проектов</div> // Обработка ошибок
	}

	return (
		<div className={classesProjectList.projectList__container}>
			<Helmet>
				<title>My project | SRS-Maker</title>
			</Helmet>
			<FuncBtn text={'Новый проект'} onClick={handleCreateProject} />{' '}
			{/* Передаем обработчик события */}
			<div className={classesProjectList.headers__block}>
				<h1>Имя проекта</h1>
				<h1>Дата создания</h1>
			</div>
			{projects.map(project => (
				<ProjectCard
					key={project.id}
					projectName={project.title} // Используйте title из полученных данных
					id={project.id} // Убедитесь, что id соответствует ожидаемому типу в ProjectCard
					date={project.createdAt} // Используйте createdAt из полученных данных
				/>
			))}
		</div>
	)
}

export { ProjectList }
