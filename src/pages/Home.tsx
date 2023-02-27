import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import '../styles/home.css'

const Home = () => {

	return (
		<section className="home">
			<Container className="hero mt-5 mt-xl-2 mb-4 p-4 pt-0 pb-0">
				<Row>
					<Col lg={6} className="d-flex flex-column justify-content-center">
						<h1>All your news in one place - NewsFeed<span className="text-primary">.</span></h1>
						<p className="mt-6 text-secondary">Your news aggregator that helps you stay up-to-date on the news you care about.</p>

						<Row className="gap-4 flex-md-nowrap mb-5">
							<Col md={6} className="border rounded p-4">
								<p className="text-center text-secondary mb-2">If you have your account:</p>
								<Button className="w-100">Login</Button>
							</Col>
							<Col md={6} className="border rounded p-4">
								<p className="text-center text-secondary mb-2">Create your account now:</p>
								<Button className="w-100 btn-dark">Register</Button>
							</Col>
						</Row>

						<Row className="align-items-center mt-2">
							<Col xs={3} md={2} lg={2}>
								<Image
									src="https://storage.googleapis.com/mixo-files/public/img/avatars/male-17.png"
									alt="Kyle Vella photo"
									className="img-fluid rounded-circle border-primary border border-3"
								/>
							</Col>
							<Col xs={9} md={10} lg={10}>
								<blockquote className="m-0">
									<p className="m-1 fw-bold">“NewsFeed is the best way to stay up-to-date on news.”</p>
									<footer className="blockquote-footer m-0">Kyle Vella</footer>
								</blockquote>
							</Col>


						</Row>
					</Col>

					<Col lg={6} className="d-none d-lg-block d-xl-block">
						<div className="position-absolute bg-light retangle opacity-75"></div>
						<svg className="position-absolute opacity-25 pattern" width="404" height="392" fill="none" viewBox="0 0 404 392">
							<defs>
								<pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
								<rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"></rect>
								</pattern>
							</defs>
							<rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
						</svg>
						<Image className="position-relative illustration w-100" src="/assets/images/hero.svg"></Image>
					</Col>
				</Row>

				<Row>
					<Col xs={12} md={6} className="d-flex flex-column justify-content-center">
						<Image src="/assets/images/custom-feed.svg" alt="NewsFeed" className="w-100"></Image>
					</Col>

					<Col xs={12} md={6} className="d-flex flex-column justify-content-center">
						<h1>Customize your news feed<span className="text-primary">.</span></h1>
						<p className="text-secondary">Create your personalized news feed with the sources and categories you care about. You can easily set up your favorite sources and categories to get the news you want.</p>
					</Col>
				</Row>

				<Row>
					<Col xs={12} md={6} className="d-flex flex-column justify-content-center">
						<h1>Search for news with ease<span className="text-primary">.</span></h1>
						<p className="text-secondary">Easily search for news by filtering by date, source and/or category. Get personalized results with NewsFeed.</p>
					</Col>

					<Col xs={12} md={6}>
						<Image src="/assets/images/search-news.svg" className="w-100"></Image>
					</Col>
				</Row>
			</Container>

			<Container fluid className="testimonials position-relative">
				<svg className="pattern position-absolute bottom-0 start-0" width="404" height="404" fill="none" viewBox="0 0 404 404" role="img" aria-labelledby="svg-squares">
					<title id="svg-squares">squares</title>
					<defs>
						<pattern id="ad119f34-7694-4c31-947f-5c9d249b21f3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
							<rect x="0" y="0" width="4" height="4" className="text-primary" fill="currentColor"></rect>
						</pattern>
					</defs>
					<rect className="rect" width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"></rect>
				</svg>
				<Container>
					<Row className="text-center justify-content-center align-items-center text-white">
						<blockquote className="mb-0">
							<p className="fw-bold fs-3 mb-5">"NewsMate has made keeping up with current events easier than ever."</p>
							<footer className="d-flex justify-content-center align-items-center gap-3">
								<div>
									<Image src="https://storage.googleapis.com/mixo-files/public/img/avatars/female-6.png" className="bg-light img-fluid rounded-circle border-light border border-3"></Image>
								</div>
								<div>
									Emma Adamson
								</div>
							</footer>
						</blockquote>
					</Row>
				</Container>
			</Container>
		</section>
	)
}

export default Home
