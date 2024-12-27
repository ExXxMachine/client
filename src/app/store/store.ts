import { configureStore } from '@reduxjs/toolkit'
import { authApiSlice } from './slice/authApiSlice'
import {createProjectApi} from './slice/createProjectSlice'
import projectReducer from './slice/projectSlice'
import userReducer from './slice/userSlice'

export const store = configureStore({
	reducer: {
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[createProjectApi.reducerPath]: createProjectApi.reducer,
		project: projectReducer,
		user: userReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
