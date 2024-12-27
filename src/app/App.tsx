import './App.css'
import './rest.css'
import { Home, Login, Project } from '../pages/authPath'
import { Header, Footer, ProjectList } from '../widgets/authWidgets'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import { useState, useEffect } from 'react'

function App() {
	const [loading, setLoading] = useState(true)
	const location = useLocation()
	const isLoginPage = location.pathname === '/login'

	useEffect(() => {
		setLoading(true)

		const timer = setTimeout(() => {
			setLoading(false)
		}, 500)

		return () => clearTimeout(timer)
	}, [location])
	if (loading) {
		return (
			<div className='loading-container'>
				<Puff color='#9b51e0' height={100} width={100} ariaLabel='loading' />
			</div>
		)
	}

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signin' element={<Login />} />
				<Route path='/myProject' element={<ProjectList />} />
				<Route path='/project/:id' element={<Project />} />
			</Routes>
			{!isLoginPage && <Footer />}
		</>
	)
}

export default App
