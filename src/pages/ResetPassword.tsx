import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const ResetPassword = () => {
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);
	const [searchParams] = useSearchParams();

	const { token } = useParams<{ token: string }>();

	const { resetPassword, errors, successMessage } = useAuthContext()

	const handleResetPassword = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		const email = searchParams.get('email') || '';
		const password = passwordRef.current?.value || '';
		const password_confirmation = passwordConfirmationRef.current?.value || '';

		console.log({email})
		resetPassword({
			email,
			token,
			password,
			password_confirmation,
		})
	}

	return (
		<section className="mt-5 form-forgot-password form-guest form-guest w-100 m-auto">

				<h1 className="h3 mb-3 fw-normal text-center">Change your password</h1>

				{errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}

				{successMessage ? (
					<div className="alert alert-success" role="alert">
						<h4 className="alert-heading">Well done!</h4>
						<p>{successMessage}</p>
						<hr />
						<p className="mb-0">
							Go to{' '}
							<Link to='/login'>Login</Link> page
						</p>
					</div>
				) : (
					<Form className="mb-4 needs-validation" onSubmit={handleResetPassword} noValidate>
						<Form.Group className="form-floating has-validation mb-2">
							<Form.Control
								type="password"
								placeholder="New password"
								ref={passwordRef}
								isInvalid={!!errors?.password}
							/>
							<Form.Label>New password</Form.Label>
							<Form.Control.Feedback type="invalid">
								{errors?.password && errors.password[0]}
							</Form.Control.Feedback>
						</Form.Group>


						<Form.Group className="form-floating has-validation mb-2">
							<Form.Control
								type="password"
								placeholder="New password"
								ref={passwordConfirmationRef}
								isInvalid={!!errors?.password}
							/>
							<Form.Label>Confirm your new password</Form.Label>
							<Form.Control.Feedback type="invalid">
								{errors?.password && errors.password[0]}
							</Form.Control.Feedback>
						</Form.Group>

						<Button variant="primary" className="w-100 btn-lg" type="submit">Save password</Button>
				</Form>
			)}
		</section>
	)
}

export default ResetPassword
