import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'

import AuthLayout from './layouts/AuthLayout'
import GuestLayout from './layouts/GuestLayout'

import NavbarComponent from './components/Navbar'
import ChangePassword from './pages/ChangePassword'
import UserNews from './pages/UserNews'
import Search from './pages/Search'

function App() {
	return (
		<>
			<NavbarComponent />

			<main>
				<Routes>
					<Route element={<AuthLayout />}>
						<Route path='/profile' element={<Profile />} />
						<Route path='/change-password' element={<ChangePassword />} />
						<Route path='/user-news' element={<UserNews />} />
						<Route path='/search' element={<Search />} />
					</Route>
					<Route element={<GuestLayout />}>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/password-reset/:token' element={<ResetPassword />} />
					</Route>
				</Routes>
			</main>

		</>
	)
}

export default App
