import { useRef, useState } from 'react'
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

		login({ email, password })
	}

	return (
		<section className="mt-5 form-signin form-guest w-100 m-auto">
			<form className="mb-4 needs-validation" onSubmit={handleLogin} noValidate>
				<h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

				<AlertMessageComponent alertMessage={errors?.alert} />

				<div className="form-floating has-validation mb-2">
					<input
						required
						type='email'
						autoComplete="email"
						ref={emailRef}
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

				<div className="form-floating mb-2">
					<input
						required
						type='password'
						autoComplete="current-password"
						ref={passwordRef}
						placeholder='Password'
						className={`form-control ${errors.password ? "is-invalid" : ""}`}
					/>
					{errors.password && (
						<div className="invalid-feedback mb-3">
							{errors.password[0]}
						</div>
					)}
					<label>Password</label>
				</div>

				<button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

			</form>
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
