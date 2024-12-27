import { Outlet } from 'react-router-dom'
import classesFooter from './Footer.module.css'
import gitHub from '../../app/assets/GitHub.png'

const Footer = () => {
	return (
		<>
			<Outlet />
			<footer className={classesFooter.container}>
				Учебный проект
				<a
					href='https://github.com/ExXxMachine'
					className={classesFooter.footer__github}
				>
					<img
						src={gitHub}
						alt='GitHubIco'
						className={classesFooter.footer__githubIco}
					/>
				</a>
			</footer>
		</>
	)
}

export { Footer }
