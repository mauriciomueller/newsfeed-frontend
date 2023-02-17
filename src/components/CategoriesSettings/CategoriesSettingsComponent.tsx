import { BsStars } from "react-icons/bs"
import { FaWindowClose } from "react-icons/fa"
import { useSettingsContext } from "../../context/SettingsContext"
import { UserSettingsCategoryType } from '../../types/types'
import AlertMessageComponent from "../AlertMessage"
import SuccessMessageComponent from "../SuccessMessage"

import '../../styles/settings.css'


export const CategoriesSettingsComponent = () => {

    const {
        isSettingsOpen,
        setIsSettingsOpen,
        categories,
        setCategories,
        categoriesInitialData,
        isCategoriesFetching,
        mutateCategories,
        successMessage,
        errors,
        categoriesIsLoading
    } = useSettingsContext()

    const onSaveSettings = (event: React.SyntheticEvent) => {
        event.preventDefault()

        if(categories && categories?.length > 0) {
            mutateCategories(categories)
        }
    }

	const handleCheckbox = (value:string) => {
        const newCategories = categories?.map((category: UserSettingsCategoryType) => {
            return category.value === value ? {...category, isSettingEnabled: !category.isSettingEnabled} : category
        })

        if(newCategories) {
            setCategories(newCategories)
        }
	}

    const closeSettings = (event: React.SyntheticEvent) => {
        event.preventDefault()
        setCategories(categoriesInitialData)

        setIsSettingsOpen(false)
    }

    return (<>
        {isSettingsOpen &&
			<section className="settings py-5">
				<div className="container">
                    <a className="close" onClick={closeSettings} href="#"><FaWindowClose /></a>
					<h2><BsStars className="mb-1" /> Tell us what interests you...</h2>

					<p>Pick the Topics you find interesting and we'll use these topics to find you more stories.</p>

                    <SuccessMessageComponent successMessage={successMessage} />
                    <AlertMessageComponent alertMessage={errors?.alert} />

                    <form onSubmit={onSaveSettings}>
                        <div className="categories d-flex gap-3 flex-wrap">
                            {(isCategoriesFetching || categoriesIsLoading) && <div className="my-4 spinner-border text-primary" role="status"></div>}
                            {!isCategoriesFetching && !categories && <p className="alert alert-danger" role="alert">Sorry, the categories couldn't be loaded.</p>}
                            {categories
                                && !isCategoriesFetching
                                && categories.length > 0
                                && categories.map((item: UserSettingsCategoryType) => {
                                    return (
                                        <label key={item.value} className={`btn checkbox ${item.isSettingEnabled ? "checked" : "unchecked"}`}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    onChange={(e) => handleCheckbox(item.value)}
                                                    type="checkbox"
                                                    value={item.value}
                                                    id="flexCheckDefault"
                                                    checked={item.isSettingEnabled}
                                                    />

                                                {item.name}
                                            </div>
                                        </label>
                                    )}
                                )
                            }
                        </div>

                        <hr />

                        <div className="d-flex justify-content-end">
                            <a className="btn" onClick={closeSettings} href="#">Cancel</a>
                            <button className={`btn btn-primary ${(isCategoriesFetching || !categories) && "disabled" }`}>Save settings</button>
                        </div>
                    </form>
				</div>
			</section>
		}
    </>
    )
}