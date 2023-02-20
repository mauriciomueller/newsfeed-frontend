import React, { useRef } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useAuthContext } from '../context/AuthContext'

const ForgotPassword = () => {
	const emailRef = useRef<HTMLInputElement>(null);

	const { forgotPassword, errors, successMessage } = useAuthContext()

	const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const email = emailRef.current?.value || '';

		forgotPassword(email)
	}

	return (
		<section className="mt-5 form-forgot-password form-guest form-guest w-100 m-auto">

			<h1 className="h3 mb-3 fw-normal text-center">Forgot your password?</h1>
			{errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}

			<Form className="mb-4 needs-validation" onSubmit={handleForgotPassword} noValidate>
				{successMessage ? (
					<Alert variant="success">{successMessage}</Alert>
				) : (<>
					<p>Let us know your email address and we will email you a password reset link.</p>

					<Form.Group className="form-floating has-validation mb-2">
						<Form.Control type="email" placeholder="Email" autoComplete="email" ref={emailRef} isInvalid={!!errors?.email} />
						<Form.Label>Email</Form.Label>
						<Form.Control.Feedback type="invalid">{errors?.email && errors.email[0]}</Form.Control.Feedback>
					</Form.Group>

					<Button variant="primary" className="w-100 btn-lg" type="submit">Reset Password</Button>
				</>)}

			</Form>
		</section>
	)
}

export default ForgotPassword
