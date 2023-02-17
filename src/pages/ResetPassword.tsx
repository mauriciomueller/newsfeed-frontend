import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const ResetPassword = () => {
	const [ password, setPassword ] = useState<string>('')
	const [ password_confirmation, setPasswordConfirmation ] = useState<string>('')
	const { token, email } = useParams()

	const { resetPassword, errors, successMessage } = useAuthContext()

	const handleResetPassword = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		resetPassword({
			email,
			token,
			password,
			password_confirmation,
		})
	}

	return (
		<section className="mt-5 form-forgot-password form-guest form-guest w-100 m-auto">
			<form className="mb-4 needs-validation" onSubmit={handleResetPassword} noValidate>
				<h1 className="h3 mb-3 fw-normal text-center">Change your password</h1>
				{successMessage ? (
					<div className="alert alert-success" role="alert">
						<h4 className="alert-heading">Well done!</h4>
						<p>{successMessage}</p>
						<hr />
						<p className="mb-0">
							Go to{' '}
							<Link
								className=""
								to='/login'
							>
								Login
							</Link> page
						</p>
					</div>
				) : (<>
					<div className="form-floating has-validation mb-2">
						<input
							required
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="New password"
							className={`form-control ${errors?.password ? "is-invalid" : ""}`}
						/>
						{errors?.password && (
							<div className="invalid-feedback mb-3">
								{errors?.password[0]}
							</div>
						)}
						<label>New password</label>
					</div>

					<div className="form-floating has-validation mb-2">
						<input
							required
							type="password"
							value={password_confirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							placeholder="Confirm your new password"
							className="form-control"
						/>

						<label>Confirm your new password</label>
					</div>

					<button className="w-100 btn btn-lg btn-primary" type="submit">Save password</button>

				</>)}

			</form>
		</section>
	)
}

export default ResetPassword
