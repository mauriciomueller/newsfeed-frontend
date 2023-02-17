import React, { useState } from 'react'
import AlertMessageComponent from '../components/AlertMessage'
import SuccessMessageComponent from '../components/SuccessMessage'
import { useAuthContext } from '../context/AuthContext'

const ForgotPassword = () => {
	const [ email, setEmail ] = useState<string>('')
	const { forgotPassword, errors, successMessage } = useAuthContext()

	const handleForgotPassword = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		forgotPassword(email)
	}

	return (
		<section className="mt-5 form-forgot-password form-guest form-guest w-100 m-auto">
			<form className="mb-4 needs-validation" onSubmit={handleForgotPassword} noValidate>
				<h1 className="h3 mb-3 fw-normal text-center">Forgot your password?</h1>
				<AlertMessageComponent alertMessage={errors?.alert} />

				{successMessage ? (
					<SuccessMessageComponent successMessage={successMessage} />
				) : (<>
					<p>Let us know your email address and we will email you a password reset link.</p>

					<div className="form-floating has-validation mb-2">
						<input
							required
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email'
							className={`form-control ${errors?.email ? "is-invalid" : ""}`}
						/>
						{errors?.email && (
							<div className="invalid-feedback mb-3">
								{errors?.email[0]}
							</div>
						)}
						<label>Email</label>
					</div>

					<button className="w-100 btn btn-lg btn-primary" type="submit">Reset Password</button>

				</>)}

			</form>
		</section>
	)
}

export default ForgotPassword
