import { MdAccountCircle, MdOutlineLogout } from "react-icons/md"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"

export const UserNavMenuComponent = () => {

    const { logout } = useAuthContext()

    return (
        <div className="d-flex justify-content-end">
            <nav className="flex-shrink-0 dropdown">
                <a href="#"
                    className="d-block link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img src="assets/images/profile.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>

                <ul className="dropdown-menu text-small shadow">
                    <li><Link className="dropdown-item" to="/profile"><MdAccountCircle /> Profile</Link></li>

                    <li><hr className="dropdown-divider" /></li>

                    <li><a href="#" className="dropdown-item" onClick={logout}><MdOutlineLogout /> Logout</a></li>
                </ul>
            </nav>
        </div>
    )
}