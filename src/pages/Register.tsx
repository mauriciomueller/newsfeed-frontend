import { useRef } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { useAuthContext } from "../context/AuthContext"

const Register = () => {
	const firstNameRef = useRef<HTMLInputElement>(null)
	const lastNameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const passwordConfirmationRef = useRef<HTMLInputElement>(null)

	const { register, errors } = useAuthContext()

	const handleRegister = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		const first_name = firstNameRef.current?.value || ''
		const last_name = lastNameRef.current?.value || ''
		const email = emailRef.current?.value || ''
		const password = passwordRef.current?.value || ''
		const password_confirmation = passwordConfirmationRef.current?.value || ''

		register({ first_name, last_name, email, password, password_confirmation })
	}

	return (
		<section className="mt-5 form-register form-guest w-100 m-auto">

			<h1 className="h3 mb-3 fw-normal text-center">Register</h1>

			{errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}

			<Form className="mb-4 needs-validation" onSubmit={handleRegister} noValidate>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="text"
						placeholder="First name"
						ref={firstNameRef}
						isInvalid={!!errors?.first_name}
					/>
					<Form.Label>First name</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.first_name && errors.first_name[0]}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="text"
						placeholder="Last name"
						ref={lastNameRef}
						isInvalid={!!errors?.last_name}
					/>
					<Form.Label>Last name</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.last_name && errors.last_name[0]}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="email"
						placeholder="Email"
						ref={emailRef}
						isInvalid={!!errors?.email}
					/>
					<Form.Label>Email</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.email && errors.email[0]}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="password"
						placeholder="Password"
						ref={passwordRef}
						isInvalid={!!errors?.password}
					/>
					<Form.Label>Password</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.password && errors.password[0]}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="form-floating has-validation mb-3">
					<Form.Control
						required
						type="password"
						placeholder="Password confirmation"
						ref={passwordConfirmationRef}
						isInvalid={!!errors?.password_confirmation}
					/>
					<Form.Label>Password confirmation</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.password_confirmation && errors.password_confirmation[0]}
					</Form.Control.Feedback>
				</Form.Group>

				<Button variant="primary" className="w-100 btn-lg" type="submit">Register</Button>
			</Form>
		</section>
	)
}

export default Register
