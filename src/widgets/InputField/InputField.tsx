import React, { useEffect, useRef } from 'react'
import classesInputField from './InputField.module.css'

interface InputFieldProps {
	fieldName: string
	value: string
	onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	placeholder?: string // Optional placeholder prop
}

const InputField: React.FC<InputFieldProps> = ({
	fieldName,
	value,
	onValueChange,
	placeholder = 'Значение поля', // Default placeholder
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto' // Reset height
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Set height based on content
		}
	}, [value]) // Run effect when value changes

	return (
		<div className={classesInputField.paragraphBlock}>
			<label htmlFor={fieldName}>{fieldName}</label>
			<textarea
				id={fieldName} // Associate label with textarea
				ref={textareaRef}
				value={value}
				onChange={onValueChange}
				placeholder={placeholder} // Use customizable placeholder
				className={classesInputField.textarea}
				rows={1}
			/>
		</div>
	)
}

export { InputField }
