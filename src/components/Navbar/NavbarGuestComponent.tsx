import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoComponent from '../Logo'

export const NavbarGuestComponent = () => {

    return (
        <>
            <Col col={6}>
                <LogoComponent />
            </Col>
            <Col col={6} className="d-flex justify-content-end">
                <Link to="/login"  className="px-4 button btn btn-primary">Login</Link>
            </Col>
        </>
    )

}