import React from 'react'
import classesBtn from './FuncBtn.module.css'
interface FuncBtnProps {
	text: string
	onClick?: () => void
}
const FuncBtn: React.FC<FuncBtnProps> = ({ text, onClick }) => {
	return (
		<button className={classesBtn.btn__container} onClick={onClick}>
			{text}
		</button>
	)
}

export { FuncBtn }
