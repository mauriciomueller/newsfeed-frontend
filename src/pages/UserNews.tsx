import CategoriesSettingsComponent from '../components/CategoriesSettings'
import { YourNewsComponent, NewsByCategoryComponent } from '../components/News'
import { UserNewsProvider } from '../context/UserNewsContext'

const UserNews = () => {
	return (<>
		<CategoriesSettingsComponent />

		<section className="container mt-5">
			<UserNewsProvider>
				<YourNewsComponent />
				<NewsByCategoryComponent />
			</UserNewsProvider>
		</section>
	</>)
}

export default UserNews
