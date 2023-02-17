import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backendApi } from '../services/backendApi'
import { UserNewsContextType, ChildrenContextType, YourNewsType, NewsByCategoryType } from '../types/types'
import { useSettingsContext } from './SettingsContext'

const UserNewsContext = createContext<UserNewsContextType>({} as UserNewsContextType)

export const useUserNewsContext = () => useContext(UserNewsContext)

export const UserNewsProvider = ({ children }: ChildrenContextType) => {

	const [ yourNews, setYourNews ] = useState<YourNewsType[] | null>(null)
    const [ newsByCategory, setNewsByCategory ] = useState<NewsByCategoryType | null>(null)
    const { categoriesInitialData, categoriesUpdatedCounter } = useSettingsContext()

    useEffect(() => {
        refetchNewsQuery()
    },[categoriesUpdatedCounter])

    const { data, isFetching, refetch: refetchNewsQuery } = useQuery({
        queryKey: ['userNews'],
        queryFn: async () => {
            const response = await backendApi.get(`/users/news`)

            setYourNews(response.data.yourNews)
			setNewsByCategory(response.data.byCategories)
            return response.data
        },
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: 3000,
        keepPreviousData: false,
        cacheTime: 0,
        enabled: (categoriesInitialData && categoriesInitialData.length > 0) ?? true,
    })

	return (
		<UserNewsContext.Provider value={{
			yourNews,
			newsByCategory,
			isFetching
		}}>
			{children}
		</UserNewsContext.Provider>
	)
}