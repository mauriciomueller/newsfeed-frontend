import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backendApi } from '../services/backendApi'
import { useSettingsContext } from './SettingsContext'

type NewsArticleSourceType = {
	id: string
	name: string
}

type NewsArticleType = {
	title: string
	url: string
	author: string
	content: string
	description?: string | undefined
	publishedAt: string
	urlToImage?: string | undefined
	source: NewsArticleSourceType
    category: Array<string>
}

export type YourNewsType = NewsArticleType

type NewsCategoryType = {
	articles: NewsArticleType[]
    categoryTitle: string
}

type NewsByCategoryType = {
    [key: string]: NewsCategoryType
}

type UserNewsContextType = {
	yourNews: YourNewsType[] | null
	newsByCategory?: NewsByCategoryType | null
	isFetching?: boolean
}

export type ChildrenContextType = {
	children: React.ReactNode
}

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

            setYourNews(response.data.result.yourNews)
			setNewsByCategory(response.data.result.byCategories)
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