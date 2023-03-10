import { createContext, useContext, useEffect, useState } from 'react'
import { backendApi } from '../services/backendApi'
import { useLocation, useNavigate } from 'react-router-dom'

type AuthContextType = {
	user: UserType | null
	getUser: () => void,
	isLogged: boolean,
	isUserLoading: boolean,
	login: (data: any) => void
	register: (data: any) => void
	logout: () => void
	updateProfile: (data: UpdateProfileParams) => void
	updatePassword: (data: UpdatePasswordParams) => void
	forgotPassword: (data: string) => void
	resetPassword: (data: ResetPasswordParams) => void
	errors: ErrorsType
	successMessage: string
}

type UpdateProfileParams = {
	first_name: string
	last_name: string
}

type UpdatePasswordParams = {
	old_password: string
	new_password: string
	new_password_confirmation: string
}

type ResetPasswordParams = {
	email: string|undefined
	token: string|undefined
	password: string
	password_confirmation: string
}

type SettingsCategoryType = {
	id: number
	code: string
	name: string
}

type SettingsSourceType = {
	id: number
	country: string
	language: string
	code: string
	name: string
}

type SettingsType = {
	categories: Array<SettingsCategoryType>
	sources: Array<SettingsSourceType>
}

type UserType = {
	id: number,
	first_name: string
	last_name: string
	email: string
	password?: string
	confirm_password?: string
	settings: SettingsType
}

type ErrorsType = {
	email?: string | null
	password?: string | null
	old_password?: string | null
	new_password?: string | null
	new_password_confirmation?: string | null
	password_confirmation?: string | null
	first_name?: string | null
	last_name?: string | null
	alert?: string | null
}

type ChildrenContextType = {
	children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: ChildrenContextType) => {
	const [ user, setUser ] = useState<UserType | null>(null)
	const [ errors, setErrors ] = useState<ErrorsType>({})
	const [ isLogged, setIsLogged ] = useState<boolean>(false)
	const [ isUserLoading, setIsUserLoading ] = useState<boolean>(true)

	const [ successMessage, setSuccessMessage ] = useState<string>("")

	const navigate = useNavigate()

	const clearStatus = () => {
		setErrors({})
		setSuccessMessage("")
	}

	const setErrorsByReponse = (error: any) => {
		if (error.response?.status === 404 || error.response?.status === 500) {
			setErrors({alert: "Error! Please try again later."})
			return
		}

		setErrors(error.response.data.errors)
	}

	const getUser = async () => {
		setIsUserLoading(true)
		try {
			const { data } = await backendApi.get('/user')
			if(data && data.result.user) {
				setUser(data.result.user)
				setIsLogged(true)
			}
		} catch (error: any) {
			setIsLogged(false)
		}
		setIsUserLoading(false)
	}

	const login = async ({ ...data }) => {
		clearStatus()

		try {
			const response = await backendApi.post('/users/login', data)
			localStorage.setItem('token', response.data.result.access_token)

			await getUser()
			navigate('/user-news')
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const register = async ({ ...data }) => {
		clearStatus()

		try {
			await backendApi.post('/users', data)
			await getUser()
			console.log(successMessage)
			navigate('/login')
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const updateProfile = async ({ ...data }) => {
		clearStatus()

		try {
			const response = await backendApi.post('/users', { ...data, email: user?.email, _method: 'PUT' })
			setSuccessMessage(response.data.message)
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const updatePassword = async ({ ...data }) => {
		clearStatus()

		try {
			const response = await backendApi.post(`/users/change-password`, { ...data, _method: 'PUT' })
			setSuccessMessage(response.data.message)
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const forgotPassword = async (email: string | undefined) => {
		clearStatus()

		try {
			const response = await backendApi.post('/users/forgot-password', { email })
			setSuccessMessage(response.data.message)
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const resetPassword = async ({ ...data }) => {
		clearStatus()

		try {
			const response = await backendApi.post('/users/reset-password', { ...data })
			setSuccessMessage(response.data.message)
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const logout = () => {
		backendApi.post('/users/logout').then(() => {
			setUser(null)
			localStorage.removeItem('token');
			navigate('/login')
		})
	}

	useEffect(() => {
		if (!user) {
			getUser()
		}
	}, [user])

	const location = useLocation()

	useEffect(() => {
		clearStatus()
	}, [location.pathname])


	return (
		<AuthContext.Provider value={{
			user,
			getUser,
			isLogged,
			isUserLoading,
			login,
			register,
			logout,
			updateProfile,
			updatePassword,
			forgotPassword,
			resetPassword,
			errors,
			successMessage
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthContext() {
	return useContext(AuthContext)
}
