import { BsStars } from "react-icons/bs"
import { FaWindowClose } from "react-icons/fa"
import { useSettingsContext, UserSettingsCategoryType } from "../../context/SettingsContext"
import { Alert, Button, Form, Spinner } from "react-bootstrap"
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

                    {errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form onSubmit={onSaveSettings}>
                        <div className="categories d-flex gap-3 flex-wrap">
                            {(isCategoriesFetching || categoriesIsLoading) &&
                                <Spinner className="my-4" animation="border" variant="primary" />
                            }
                            {!isCategoriesFetching && !categories &&
                                <Alert variant="danger">Sorry, the categories couldn't be loaded.</Alert>
                            }
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
                            <Button variant="link" onClick={closeSettings}>Cancel</Button>
                            <Button variant="primary" type="submit" disabled={(isCategoriesFetching || !categories) ? true : false}>Save settings</Button>
                        </div>
                    </Form>
				</div>
			</section>
		}
    </>
    )
}