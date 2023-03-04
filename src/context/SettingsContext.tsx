import { createContext, useContext, useEffect, useState } from 'react'
import { UseMutateFunction, useMutation, useQuery, useQueryClient } from 'react-query'
import { backendApi } from '../services/backendApi'
import { useAuthContext } from './AuthContext'

type ErrorsType = {
	alert?: string | null
}

type SettingsContextType = {
	isSettingsOpen: boolean
	setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
	categories: UserSettingsCategoryType[] | null
	setCategories: React.Dispatch<React.SetStateAction<UserSettingsCategoryType[] | null>>
	categoriesInitialData:UserSettingsCategoryType[] | null
	setCategoriesInitialData: React.Dispatch<React.SetStateAction<UserSettingsCategoryType[] | null>>
	isCategoriesFetching: boolean,
	mutateCategories: UseMutateFunction<any, any, UserSettingsCategoryType[], unknown>
	successMessage: string
	errors: ErrorsType,
	categoriesIsLoading: boolean,
	categoriesUpdatedCounter: number,
}

export type UserSettingsCategoryType = {
    name: string
    value: string
    isSettingEnabled: boolean
}

type ChildrenContextType = {
	children: React.ReactNode
}

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType)

export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: ChildrenContextType) => {

	const [ isSettingsOpen, setIsSettingsOpen ] = useState<boolean>(false)
    const [ categories, setCategories ] = useState<UserSettingsCategoryType[] | null>(null)
    const [ categoriesInitialData, setCategoriesInitialData ] = useState<UserSettingsCategoryType[] | null>(null)
	const [ errors, setErrors ] = useState<ErrorsType>({})
    const [ successMessage, setSuccessMessage ] = useState<string>("")
	const [ categoriesUpdatedCounter, setCategoriesUpdatedCounter ] = useState<number>(0)
	const { user } = useAuthContext()

	useEffect(() => {
		if (isSettingsOpen) {
			clearStatus()
			refetch()
		}
	}, [isSettingsOpen])

	useEffect(() => {
		clearStatus()
		if (isSettingsOpen) {
			refetch()
		}
	}, [user])

    const {data, isFetching: isCategoriesFetching, refetch} = useQuery<UserSettingsCategoryType[] | null>('categories', async () => {

		const response = await backendApi.get(`/users/categories/`)

		setCategories(response.data.result)
		setCategoriesInitialData(response.data.result)
		return response.data
    },{
        initialData: categories,
		enabled: !!user?.id,
		refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: 3000,
    })

	const updateCategories = async (data: Array<UserSettingsCategoryType>) => {
        const enabledValues = data.filter(item => item.isSettingEnabled).map(item => item.value)
	    const { data: response } = await backendApi.post(`/users/categories/`, { settings_categories_codes: enabledValues, _method: 'PUT' })
        return response.data
    }

    const queryClient = useQueryClient()

    const clearStatus = () => {
		setErrors({})
		setSuccessMessage("")
	}

    const { mutate: mutateCategories, isLoading: categoriesIsLoading } = useMutation(updateCategories, {
        onSuccess: data => {
            clearStatus()
            setSuccessMessage("Your categories settings was updated successfully.")
			setCategoriesUpdatedCounter((prevCounter:number) => prevCounter + 1)
        },
        onError: (error: any) => {
            clearStatus()
            setErrors({alert: "Error when saving categories settings! Please try again later."})
        },
        onSettled: () => {
            queryClient.invalidateQueries('categories')
        }
    })

	return (
		<SettingsContext.Provider value={{
			isSettingsOpen,
			setIsSettingsOpen,
			categories,
			setCategories,
			categoriesInitialData,
			setCategoriesInitialData,
			isCategoriesFetching,
			mutateCategories,
			successMessage,
			errors,
			categoriesIsLoading,
			categoriesUpdatedCounter
		}}>
			{children}
		</SettingsContext.Provider>
	)
}