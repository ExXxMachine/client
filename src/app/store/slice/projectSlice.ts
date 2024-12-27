import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Field {
	fieldName: string
	value: string
}

interface ProjectState {
	projectName: string
	date: string
	data: Field[]
}

const initialState: ProjectState = {
	projectName: 'Project Name',
	date: '2024-12-19',
	data: [
		{ fieldName: 'Field 1', value: 'Value 1' },
		{ fieldName: 'Field 2', value: 'Value 2' },
	],
}

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		updateFieldName(
			state,
			action: PayloadAction<{ index: number; fieldName: string }>
		) {
			const { index, fieldName } = action.payload
			state.data[index].fieldName = fieldName
		},
		updateFieldValue(
			state,
			action: PayloadAction<{ index: number; value: string }>
		) {
			const { index, value } = action.payload
			state.data[index].value = value
		},
		addField(state, action: PayloadAction<Field>) {
			state.data.push(action.payload)
		},
		saveProject(state) {
			console.log('Saved Data:', state.data)
			// Здесь можно добавить логику для сохранения данных
		},
	},
})

// Экспортируем actions и reducer
export const { updateFieldName, updateFieldValue, addField, saveProject } =
	projectSlice.actions
export default projectSlice.reducer
