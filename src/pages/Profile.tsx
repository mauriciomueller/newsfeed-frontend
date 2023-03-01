import { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const Profile = () => {
	const [first_name, setFirstName] = useState<string>("")
	const [last_name, setLastName] = useState<string>("")
	const [email, setEmail] = useState<string>("")

	const { user, updateProfile, errors, successMessage} = useAuthContext()

	useEffect(() => {
		if(user) {
			setFirstName(user.first_name)
			setLastName(user.last_name)
			setEmail(user.email)
		}
	}, [user])

	const handleUpdateProfile = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		updateProfile({ first_name, last_name })
	}

	return (
		<section className="mt-5 form-register form-guest w-100 m-auto">
			<form className="mb-4 needs-validation" onSubmit={handleUpdateProfile} noValidate>
				<h1 className="h3 mb-3 fw-normal text-center">Your profile</h1>

				{errors && errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}
				{successMessage && <Alert variant="success">{successMessage}</Alert>}

				<div className="form-floating has-validation mb-2">
					<input
						required
						type="text"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First name"
						className={`form-control ${errors?.first_name ? "is-invalid" : ""}`}
					/>
					{errors?.first_name && (
						<div className="invalid-feedback mb-3">
							{errors.first_name[0]}
						</div>
					)}
					<label>First name</label>
				</div>


				<div className="form-floating has-validation mb-2">
					<input
						required
						type="text"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last name"
						className={`form-control ${errors?.last_name ? "is-invalid" : ""}`}
					/>
					{errors?.last_name && (
						<div className="invalid-feedback mb-3">
							{errors.last_name[0]}
						</div>
					)}
					<label>Last name</label>
				</div>

				<div className="form-floating has-validation mb-2">
					<input
						disabled
						readOnly
						type="email"
						value={email}
						placeholder="Email"
						className={`form-control ${errors?.email ? "is-invalid" : ""}`}
					/>
					{errors?.email && (
						<div className="invalid-feedback mb-3">
							{errors.email[0]}
						</div>
					)}
					<label>Email</label>
				</div>


				<button className="w-100 btn btn-lg btn-primary" type="submit">Update</button>

			</form>

			<div className="text-center">
				<Link to="/change-password" className="mb-3 fw-normal">Change your password</Link>
			</div>

		</section>
	)
}

export default Profile
