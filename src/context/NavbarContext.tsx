import { createContext, useContext, useState } from 'react'

type NavbarContextType = {
	handleSearchOnFocus: () => void,
	handleSearchOnBlur: () => void,
	setIsSearchOnFocus: React.Dispatch<React.SetStateAction<Boolean>>,
	isSearchOnFocus: Boolean,
}

type ChildrenContextType = {
	children: React.ReactNode
}

const NavbarContext = createContext<NavbarContextType>({} as NavbarContextType)

export const useNavbarContext = () => useContext(NavbarContext)

export const NavbarProvider = ({ children }: ChildrenContextType) => {

	const [isSearchOnFocus, setIsSearchOnFocus] = useState<Boolean>(false)

    const handleSearchOnFocus = () => {
		console.log('focus')
		setIsSearchOnFocus(true)
	}

	const handleSearchOnBlur = () => {
		console.log('blur')
		setIsSearchOnFocus(false)
	}

	return (
		<NavbarContext.Provider value={{
			handleSearchOnFocus,
			handleSearchOnBlur,
			setIsSearchOnFocus,
			isSearchOnFocus,
		}}>
			{children}
		</NavbarContext.Provider>
	)
}