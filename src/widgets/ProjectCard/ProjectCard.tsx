import React from 'react'
import classesProjectCart from './ProjectCard.module.css'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
	id: string
	projectName: string
	date: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, projectName, date }) => {
	return (
		<Link
			to={`/project/${id}`}
			className={classesProjectCart.projectCard__container}
		>
			<p>{projectName}</p>
			<p>{date}</p>
		</Link>
	)
}

export { ProjectCard }
