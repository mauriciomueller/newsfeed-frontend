import { createContext, useContext, useEffect, useState } from 'react'
import { backendApi } from '../services/backendApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContextType, UserType, ErrorsType, ChildrenContextType } from '../types/types'

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
		if (error.response.status === 404 || error.response.status === 500) {
			setErrors({alert: "Error! Please try again later."})
		}

		setErrors(error.response.data.errors)
	}

	const getUser = async () => {
		setIsUserLoading(true)
		try {
			const { data } = await backendApi.get('/user')
			if(data && data.user) {
				setUser(data.user)
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
			const response = await backendApi.post('/login', data)
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
			const response = await backendApi.post('/users/', { ...data, email: user?.email, _method: 'PUT' })
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
			const response = await backendApi.post('/forgot-password', { email })
			setSuccessMessage(response.data.message)
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const resetPassword = async ({ ...data }) => {
		clearStatus()

		try {
			const response = await backendApi.post('/reset-password', { ...data })
			setSuccessMessage(response.data.message)
		} catch (error: any) {
			setErrorsByReponse(error)
		}
	}

	const logout = () => {
		backendApi.post('/logout').then(() => {
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
