import { Col } from "react-bootstrap"
import { useNavbarContext } from "../../context/NavbarContext"
import LogoComponent from "../Logo"
import SearchComponent from "../Search"
import UserNavMenuComponent from "../UserNavMenu"

export const NavbarAuthComponent = () => {

	const { isSearchOnFocus } = useNavbarContext()

    return (
		<>
			<Col md={3} xs={5} className={isSearchOnFocus && 'd-none d-md-flex'}>
				<LogoComponent />
			</Col>
			<Col md={8} xs={isSearchOnFocus ? 12 : 5}>
				<SearchComponent />
			</Col>
			<Col md={1} xs={2} className={isSearchOnFocus && 'd-none d-md-flex'}>
				<UserNavMenuComponent />
			</Col>
		</>
    )
}