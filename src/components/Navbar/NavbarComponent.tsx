import Navbar from 'react-bootstrap/Navbar'
import { NavbarGuestComponent } from './NavbarGuestComponent'

import { useAuthContext } from '../../context/AuthContext'
import { NavbarAuthComponent } from './NavbarAuthComponent'

import '../../styles/nav.css'
import SearchComponent from '../Search'
import { Image } from 'react-bootstrap'

export const NavbarComponent = () => {

	const { user } = useAuthContext()

    return (
		<header className="py-3 border-bottom">
			<div className="container-fluid d-grid gap-3 align-items-center"
			style={user ? {
				gridTemplateColumns: "1fr 2fr 1fr",
			} : {
				gridTemplateColumns: "1fr 1fr",
			}}>

				<Navbar.Brand href="/" className="d-flex gap-2 align-items-center">
					<Image className="position-relative illustration" src="/assets/images/newsfeed-logo.svg" width="30px" height="30px"></Image>
					<h1 className="fs-3 m-0">NewsFeed<span className="text-primary">.</span></h1>
				</Navbar.Brand>

				{ user ? <NavbarAuthComponent /> : <NavbarGuestComponent /> }

			</div>
		</header>
    )
}