import { useRef } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AlertMessageComponent from '../components/AlertMessage'
import { useAuthContext } from '../context/AuthContext'

import '../styles/form.css'

const Login = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { login, errors } = useAuthContext()

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		console.log({email, password})

		login({ email, password })
	}

	return (
		<section className="mt-5 form-signin form-guest w-100 m-auto">

			<h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>
			{errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}

			<Form className="mb-4 needs-validation" onSubmit={handleLogin} noValidate>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control type="email" autoComplete="email" ref={emailRef} isInvalid={!!errors?.email} />
					<Form.Label>Email</Form.Label>
					<Form.Control.Feedback type="invalid">{errors?.email && errors.email[0]}</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control type="password" autoComplete="current-password" ref={passwordRef} isInvalid={!!errors?.password} />
					<Form.Label>Password</Form.Label>
					<Form.Control.Feedback type="invalid">{errors?.password && errors.password[0]}</Form.Control.Feedback>
				</Form.Group>

				<Button variant="primary" className="w-100 btn-lg" type="submit">Sign in</Button>
			</Form>

			<div className="text-center">
				<p>
					<Link
						to='/forgot-password'
						className='mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline'
					>
						Forgot your password?
					</Link>
				</p>

				<p>
					<Link to='/register' className='text-primary hover:underline'>
						Create an account
					</Link>
				</p>
			</div>

		</section>
	)
}

export default Login
