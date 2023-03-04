import { NavbarGuestComponent } from './NavbarGuestComponent'
import { useAuthContext } from '../../context/AuthContext'
import { NavbarAuthComponent } from './NavbarAuthComponent'
import { Container, Row } from 'react-bootstrap'
import { useNavbarContext } from '../../context/NavbarContext'

import '../../styles/nav.css'

export const NavbarComponent = () => {

	const { user } = useAuthContext()

	return (
		<header className="py-3 border-bottom">
			<Container>
				<Row className="d-flex align-items-center">
					{ user ? <NavbarAuthComponent /> : <NavbarGuestComponent /> }
				</Row>
			</Container>
		</header>
    )
}