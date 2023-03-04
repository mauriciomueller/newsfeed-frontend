import React, { useEffect, useRef, useState } from "react"
import { Button, Form, ToggleButton } from "react-bootstrap"
import { BiSearchAlt2 } from "react-icons/bi"
import { RiArrowDownSFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { useNavbarContext } from "../../context/NavbarContext"

export const SearchComponent = () => {

    const navigate = useNavigate()
    const [ isFilterOpen, setIsFilterOpen ] = useState<boolean>(false)
    const [ showExtraFilter, setShowExtraFilter ] = useState<string>('')
    const [ selectedSources, setSelectedSources ] = useState<string[]>([])
    const [ searchParams, setSearchParams ] = useState({
        q: '',
        category: '',
        sources: '',
        date: ''
    })

    const { user } = useAuthContext()
    const { handleSearchOnFocus, handleSearchOnBlur, setIsSearchOnFocus, isSearchOnFocus } = useNavbarContext()

    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && ref.current.parentElement && !ref.current.parentElement.contains(event.target as Node)) {
            setIsFilterOpen(false)
            setIsSearchOnFocus(false)
        }
    }

    const handleToggleFilters = (event: React.SyntheticEvent) => {
        event.preventDefault()
        setIsFilterOpen(!isFilterOpen)
        setIsSearchOnFocus(!isFilterOpen)
        setShowExtraFilter('show_date_filter')
        setSearchParams(prevData => {
            return {
                ...prevData,
                sources: '',
                category: '',
                date: '',
            }
        })
    }

    useEffect(() => {
        if (isFilterOpen || isSearchOnFocus) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[isFilterOpen, isSearchOnFocus])

    const handleExtraFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowExtraFilter(event.target.value)
    }

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(prevData => {
            return {
                ...prevData,
                q: event.target.value,
            }
        })
    }

    const handleFilterByCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(prevData => {
            return {
                ...prevData,
                category: event.target.value,
                sources: ''
            }
        })
    }

    const handleFilterBySourcesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const source = event.target.value
        const isChecked = event.target.checked

        if (selectedSources.length >= 20 && isChecked) {
            return
        }

        if (isChecked) {
            setSelectedSources(prevSources => [...prevSources, source])
        } else {
            setSelectedSources(prevSources => prevSources.filter(s => s !== source))
        }
    }

    useEffect(() => {
        setSearchParams(prevData => {
            return {
                ...prevData,
                sources: selectedSources.join(','),
                category: ''
            }
        })
    }, [selectedSources])

    const handleFilterByDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(prevData => {
            return {
                ...prevData,
                date: event.target.value
            }
        })
    }

    const handleFilterSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        const params = Object.entries(searchParams)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${key}=${value}`)
            .join('&')

        setIsFilterOpen(false)
        setIsSearchOnFocus(false)
		navigate(`/search?${params}`)

    }

    return (
        <Form className="w-100 me-3 search" onSubmit={handleFilterSubmit}>
            <div ref={ref}>
                <div className="container">
                    <BiSearchAlt2 className="magnifying-glass" />

                    <Button
                        className={`d-none submit ${!isFilterOpen && 'd-xl-block d-lg-block d-md-block'}`}
                        disabled={searchParams.q.length === 0}
                        type="submit"
                        variant="primary">
                        Search
                    </Button>

                    <button className="filters-button" onClick={handleToggleFilters}><RiArrowDownSFill className="icon" /></button>
                    <input type="text" className="form-control search-input" onFocus={handleSearchOnFocus} onChange={handleSearchInputChange} placeholder="Search..." aria-label="Search" />
                </div>

                {isFilterOpen && (
                    <div className="filters rounded p-3 shadow">

                        <div className="mb-2">
                            <Form.Check
                                inline
                                label="Only Date"
                                name="extra-filters"
                                type="radio"
                                value="show_date_filter"
                                onChange={handleExtraFilterChange}
                                defaultChecked
                            />
                            <Form.Check
                                inline
                                label="By Category"
                                name="extra-filters"
                                type="radio"
                                value="show_category_filter"
                                onChange={handleExtraFilterChange}
                            />

                            <Form.Check
                                inline
                                label="By Sources"
                                name="extra-filters"
                                type="radio"
                                value="show_sources_fiter"
                                onChange={handleExtraFilterChange}
                            />
                        </div>

                        <hr />
                        {showExtraFilter === 'show_date_filter' &&
                            <div className="d-flex gap-2 mb-4">
                                <label className="align-self-center">By Date:</label>
                                <Form.Select onChange={handleFilterByDateChange} className="w-auto" aria-label="filter by date">
                                    <option value="">Any date</option>
                                    <option value="last_hour">Last hour</option>
                                    <option value="last_24_hours">Last 24 hours</option>
                                    <option value="last_week">Last week</option>
                                    <option value="last_year">Last year</option>
                                </Form.Select>
                            </div>
                        }

                        {showExtraFilter === 'show_category_filter' &&
                            <div className="category d-flex gap-2 mb-3">
                                <label className="align-self-center">Category:</label>
                                <Form.Select onChange={handleFilterByCategoryChange} className="w-auto" aria-label="filter by category">
                                    <option value="">Choose a category</option>
                                    {user?.settings.categories && user.settings.categories.map(category => {
                                        return (
                                            <option key={category.code} value={category.code}>{category.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                        }

                        {showExtraFilter === 'show_sources_fiter' &&
                            <>
                                <div className="sources mb-3">
                                    <p>Sources (maximum 20):</p>
                                    <div className="border rounded p-3 d-flex flex-wrap gap-2 options">
                                        {user?.settings.sources && user.settings.sources.map(source => {
                                            return (
                                                <Form.Check
                                                    inline
                                                    key={source.code}
                                                    label={source.name}
                                                    name="sources"
                                                    type="checkbox"
                                                    value={source.code}
                                                    onChange={handleFilterBySourcesChange}
                                                    disabled={selectedSources.length === 20 && !selectedSources.includes(source.code)}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="d-flex gap-2 mb-4">
                                    <label className="align-self-center">By Date:</label>
                                    <Form.Select onChange={handleFilterByDateChange} className="w-auto" aria-label="filter by date">
                                        <option value="">Any date</option>
                                        <option value="last_hour">Last hour</option>
                                        <option value="last_24_hours">Last 24 hours</option>
                                        <option value="last_week">Last week</option>
                                    </Form.Select>
                                </div>
                            </>
                        }

                        <hr className="mt-4" />
                        <div className="d-flex justify-content-end gap-2">
                            <Button onClick={handleToggleFilters} variant="link">Cancel</Button>
                            <Button type="submit" variant="primary">Search</Button>
                        </div>
                    </div>
                )}
            </div>
        </Form>
    )
}