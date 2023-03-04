import moment from 'moment'
import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { backendApi } from '../services/backendApi'
import { processImageUrl } from '../utils/utils'

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

type NewsCategoryType = {
	articles: NewsArticleType[]
    categoryTitle: string
}

const Search = () => {

	const location = useLocation()
	const [ params, setParams ] = useState('')

	useEffect(() => {
		setParams(location.search)
	},[location.search])


	const { data: news, isFetching, refetch: refecthSearch } = useQuery({
        queryKey: ['search', params],
        queryFn: async (queryKey) => {
			const response = await backendApi.get(`/news/search${queryKey.queryKey[1]}`)

			return response.data
		},
        refetchOnWindowFocus: false,
        retry: 1,
        retryDelay: 3000,
        keepPreviousData: false,
        cacheTime: 0,
		enabled: params ? true : false,
    })

	return (
		<section className="container mt-5">
			<section className="news row">
				<h2 className="mb-2 text-primary">Search News Results</h2>

				<hr className="mb-4" />

				{ isFetching ? (
					<div className="container w-100 text-center">
						<div className="spinner-border text-primary" role="status"></div>
					</div>

				) : (<>
					{(!news || news.length === 0) &&
						<Col>
							<div className="alert alert-danger" role="alert">We couldn't find any news! Try again later or change your search criteria.</div>
						</Col>
					}

					{(news && news.length > 0) && news.map((article: NewsArticleType, index: number) => (
						<Col xxl={4} sm={6} xs={12} className="mb-5" key={index}>
							<article className="pb-4">
								<a 	href={processImageUrl(article?.url)}
									className="media mb-3"
									style={{
										backgroundImage: `url(${processImageUrl(article?.urlToImage)})`
									}}
								>
									{article?.publishedAt &&
										<span className="published-at badge bg-dark bg-opacity-50 m-3 shadow opacity-0">
											{moment(article?.publishedAt).format('LLL')}
										</span>
									}
								</a>
								<div className="pb-4">
									<h2><a href={processImageUrl(article?.url)}>{article?.title}</a></h2>

									<div className="mb-2 d-flex gap-2 flex-wrap">
										{article?.source?.name && <span className="badge bg-primary">Source: {article?.source?.name}</span>}
										{article?.category && <span className="badge bg-dark">{article?.category.join(' / ')}</span>}
									</div>
									<p>
										<a href={processImageUrl(article?.url)}>{article?.description}</a>
									</p>
								</div>


								<footer>
									<a href={article?.url} className="btn btn-primary w-100">Read more</a>
								</footer>
							</article>
						</Col>
					))}

				</>)}
			</section>
		</section>
	)
}

export default Search
