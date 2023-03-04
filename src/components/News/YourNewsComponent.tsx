import { processImageUrl } from '../../utils/utils'
import { Col, Row } from 'react-bootstrap'
import { MdSettings } from 'react-icons/md'
import { useSettingsContext } from '../../context/SettingsContext'
import moment from 'moment'
import "../../styles/news.css"
import { useUserNewsContext } from '../../context/UserNewsContext'


export type YourNewsType = NewsArticleType

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

type NewsArticleSourceType = {
	id: string
	name: string
}

export const YourNewsComponent = () => {


    const { yourNews, isFetching } = useUserNewsContext()
    const { isSettingsOpen, setIsSettingsOpen } = useSettingsContext()

	const toggleSettings = (event: React.SyntheticEvent) => {
		event.preventDefault()
		setIsSettingsOpen(!isSettingsOpen)
	}

    return (
        <Row className="news">

            <h2 className="mb-2 text-primary">Your News</h2>

            <div className="d-flex justify-content-between">
                <div>
                    <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="ml-auto">
                    <a className="text-decoration-none" href="#" onClick={toggleSettings}><MdSettings className="mb-1" /> Change settings</a>
                </div>
            </div>

            <hr className="mb-4" />

            { isFetching ? (
                <div className="container w-100 text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>

            ) : (<>
                {(!yourNews || yourNews.length === 0) &&
                    <div className="alert alert-danger" role="alert">We couldn't load any news! Try again later.</div>
                }

                {(yourNews && yourNews.length > 0) && yourNews.map((value: YourNewsType, index: number) => (
                    <Col xxl={4} sm={6} xs={12} className="mb-5" key={index}>
                        <article className="pb-4">
                            <a 	href={processImageUrl(value.url)}
                                className="media mb-3"
                                style={{
                                    backgroundImage: `url(${processImageUrl(value.urlToImage)})`
                                }}
                            >
                                {value.publishedAt &&
                                    <span className="published-at badge bg-dark bg-opacity-50 m-3 shadow opacity-0">
                                        {moment(value.publishedAt).format('LLL')}
                                    </span>
                                }
                            </a>
                            <div className="pb-4">
                                <h2><a href={processImageUrl(value.url)}>{value.title}</a></h2>

                                <div className="mb-2 d-flex gap-2 flex-wrap">
                                    {value.source.name && <span className="badge bg-primary">Source: {value.source.name}</span>}
                                    {value.category && <span className="badge bg-dark">{value.category.join(' / ')}</span>}
                                </div>
                                <p>
                                    <a href={processImageUrl(value.url)}>{value.description}</a>
                                </p>
                            </div>


                            <footer>
                                <a href={value.url} className="btn btn-primary w-100">Read more</a>
                            </footer>
                        </article>
                    </Col>
                ))}

            </>)}
        </Row>
    )
}