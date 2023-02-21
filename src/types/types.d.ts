export type ChildrenContextType = {
	children: React.ReactNode
}

export type SearchNewsContextType = {
	filterOptions: Array
}

export type UserNewsContextType = {
	yourNews: YourNewsType[] | null
	newsByCategory?: NewsByCategoryType | null
	isFetching?: boolean
}

export type NewsCategoryType = {
	articles: NewsArticleType[]
    categoryTitle: string
}

export type NewsByCategoryType = {
    [key: string]: NewsCategoryType
}

export type YourNewsType = NewsArticleType

export type NewsArticleType = {
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

export type NewsArticleSourceType = {
	id: string
	name: string
}

export type SettingsCategoryType = {
	id: number
	code: string
	name: string
}

export type SettingsSourceType = {
	id: number
	country: string
	language: string
	code: string
	name: string
}

export type SettingsType = {
	categories: Array<SettingsCategoryType>
	sources: Array<SettingsSourceType>
}

export type UserSettingsCategoryType = {
    name: string
    value: string
    isSettingEnabled: boolean
}

export type UserType = {
	id: number,
	first_name: string
	last_name: string
	email: string
	password?: string
	confirm_password?: string
	settings: SettingsType
}

export type AuthContextType = {
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

export type UpdatePasswordParams = {
	old_password: string
	new_password: string
	new_password_confirmation: string
}

export type ResetPasswordParams = {
	email: string|undefined
	token: string|undefined
	password: string
	password_confirmation: string
}

export type UpdateProfileParams = {
	first_name: string
	last_name: string
}

export type ErrorsType = {
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

export type SettingsContextType = {
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