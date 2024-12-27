import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store/store'
import {
	updateFieldName,
	updateFieldValue,
	saveProject,
} from '../../app/store/slice/projectSlice'
import { InputField } from '../../widgets/InputField/InputField'
import classesProject from './Project.'

const Project = () => {
	const dispatch = useDispatch()
	const editableProject = useSelector((state: RootState) => state.project)

	const [editingFields, setEditingFields] = useState(
		editableProject.data.map(item => ({
			fieldName: item.fieldName,
			value: item.value,
		}))
	)

	useEffect(() => {
		setEditingFields(
			editableProject.data.map(item => ({
				fieldName: item.fieldName,
				value: item.value,
			}))
		)
	}, [editableProject.data])

	const handleValueChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>, // Измените тип события на HTMLTextAreaElement
		index: number
	) => {
		const updatedFields = [...editingFields]
		updatedFields[index].value = e.target.value
		setEditingFields(updatedFields)
	}

	const handleSave = () => {
		for (let i = 0; i < editingFields.length; i++) {
			dispatch(
				updateFieldName({ index: i, fieldName: editingFields[i].fieldName })
			)
			dispatch(updateFieldValue({ index: i, value: editingFields[i].value }))
		}
		dispatch(saveProject())
	}

	return (
		<div className={classesProject.project__block}>
			<h2>{editableProject.projectName}</h2>
			<ul>
				{editingFields.map((item, index) => (
					<li key={`${item.fieldName}-${index}`}>
						<InputField
							fieldName={item.fieldName}
							value={item.value}
							onValueChange={e => handleValueChange(e, index)} 
						/>
					</li>
				))}
			</ul>

			{/* Кнопка сохранения */}
			<button onClick={handleSave}>Сохранить</button>
		</div>
	)
}

export { Project }
