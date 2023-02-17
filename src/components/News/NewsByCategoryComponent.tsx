import { processImageUrl } from '../../utils/utils'
import { Col } from 'react-bootstrap'
import moment from 'moment'
import { useUserNewsContext } from '../../context/UserNewsContext'


import { NewsArticleType } from '../../types/types'
import "../../styles/news.css"

export const NewsByCategoryComponent = () => {

    const { newsByCategory, isFetching } = useUserNewsContext()

    return (
        <div className="news-by-category">
            { isFetching ? (
                <div className="container w-100 text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>

            ) : (<>
                {(!newsByCategory || Object.keys(newsByCategory).length === 0) &&
                    <div className="alert alert-danger" role="alert">We couldn't load any news! Try again later.</div>
                }

                {(newsByCategory && Object.keys(newsByCategory).length > 0) && Object.keys(newsByCategory).map((news: string) => (
                    <section className={`news row ${news}`} key={news}>

                        <div className="d-flex justify-content-between gap-3 mb-4">
                            <h2 className="m-0">{newsByCategory[news]['categoryTitle']}</h2>
                            <hr className="w-100 align-self-center" />
                        </div>

                        {newsByCategory[news]['articles'].map((article: NewsArticleType, index: number) => (
                            <Col xxl={4} sm={6} xs={12} className="mb-5" key={index}>
                                <article className="pb-4">
                                    <a 	href={processImageUrl(article.url)}
                                        className="media mb-3"
                                        style={{
                                            backgroundImage: `url(${processImageUrl(article.urlToImage)})`
                                        }}
                                    >
                                        {article.publishedAt &&
                                            <span className="published-at badge bg-dark bg-opacity-50 m-3 shadow opacity-0">
                                                {moment(article.publishedAt).format('LLL')}
                                            </span>
                                        }
                                    </a>
                                    <div className="pb-4">
                                        <h2><a href={processImageUrl(article.url)}>{article.title}</a></h2>

                                        <div className="mb-2 d-flex gap-2 flex-wrap">
                                            {article.source.name && <span className="badge bg-primary">Source: {article.source.name}</span>}
                                            {article.category && <span className="badge bg-dark">{article.category.join(' / ')}</span>}
                                        </div>
                                        <p>
                                            <a href={processImageUrl(article.url)}>{article.description}</a>
                                        </p>
                                    </div>


                                    <footer>
                                        <a href={article.url} className="btn btn-primary w-100">Read more</a>
                                    </footer>
                                </article>
                            </Col>
                        ))}

                    </section>
                ))}

            </>)}
        </div>
    )
}