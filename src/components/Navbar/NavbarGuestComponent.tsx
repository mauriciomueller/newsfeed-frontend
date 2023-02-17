import { Link } from 'react-router-dom'

export const NavbarGuestComponent = () => {
    return (
        <div className="d-flex justify-content-end">
            <Link to="/login"  className="px-4 button btn btn-primary">Login</Link>
        </div>
    )

}