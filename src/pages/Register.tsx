import { useState } from "react"
import AlertMessageComponent from "../components/AlertMessage"
import { useAuthContext } from "../context/AuthContext"

const Register = () => {
	const [first_name, setFirstName] = useState<string>("")
	const [last_name, setLastName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [password_confirmation, setPasswordConfirmation] = useState<string>("")

	const { register, errors } = useAuthContext()

	const handleRegister = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		register({ first_name, last_name, email, password, password_confirmation })
	}

	return (
		<section className="mt-5 form-register form-guest w-100 m-auto">
			<form className="mb-4 needs-validation" onSubmit={handleRegister} noValidate>
				<h1 className="h3 mb-3 fw-normal text-center">Register</h1>

				<AlertMessageComponent alertMessage={errors?.alert} />

				<div className="form-floating has-validation mb-2">
					<input
						required
						type="text"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First name"
						className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
					/>
					{errors.first_name && (
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
						className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
					/>
					{errors.last_name && (
						<div className="invalid-feedback mb-3">
							{errors.last_name[0]}
						</div>
					)}
					<label>Last name</label>
				</div>

				<div className="form-floating has-validation mb-2">
					<input
						required
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className={`form-control ${errors.email ? "is-invalid" : ""}`}
					/>
					{errors.email && (
						<div className="invalid-feedback mb-3">
							{errors.email[0]}
						</div>
					)}
					<label>Email</label>
				</div>

				<div className="form-floating mb-2">
					<input
						required
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className={`form-control ${errors.password ? "is-invalid" : ""}`}
					/>
					{errors.password && (
						<div className="invalid-feedback mb-3">
							{errors.password[0]}
						</div>
					)}
					<label>Password</label>
				</div>

				<div className="form-floating mb-2">
					<input
						required
						type="password"
						value={password_confirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						placeholder="Password confirmation"
						className="form-control"
					/>

					<label>Password confirmation</label>
				</div>

				<button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>

			</form>
		</section>
	)
}

export default Register
