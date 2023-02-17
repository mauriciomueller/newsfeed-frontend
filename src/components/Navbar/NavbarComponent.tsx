import Navbar from 'react-bootstrap/Navbar'
import { NavbarGuestComponent } from './NavbarGuestComponent'

import { useAuthContext } from '../../context/AuthContext'
import { NavbarAuthComponent } from './NavbarAuthComponent'
import { BsNewspaper } from "react-icons/bs"

import '../../styles/nav.css'
import SearchComponent from '../Search'

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

				<Navbar.Brand href="/"><BsNewspaper className="mb-1" /> News Aggregator</Navbar.Brand>

				{ user ? <NavbarAuthComponent /> : <NavbarGuestComponent /> }

			</div>
		</header>
    )
}