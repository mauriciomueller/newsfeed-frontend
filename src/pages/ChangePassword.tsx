import { SyntheticEvent, useRef } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { useAuthContext } from "../context/AuthContext"

type FormSubmitEvent = SyntheticEvent<HTMLFormElement>;

const ChangePassword = () => {

	const formRef = useRef<HTMLFormElement>(null);
	const oldPasswordRef = useRef<HTMLInputElement | null>(null)
	const newPasswordRef = useRef<HTMLInputElement | null>(null)
	const newPasswordConfirmationdRef = useRef<HTMLInputElement | null>(null)

	const { updatePassword, errors, successMessage } = useAuthContext()

	const handleUpdatePassword = async (event: FormSubmitEvent) => {
		event.preventDefault()

		const old_password = oldPasswordRef.current?.value || ''
		const new_password = newPasswordRef.current?.value || ''
		const new_password_confirmation = newPasswordConfirmationdRef.current?.value || ''

		updatePassword({ old_password, new_password, new_password_confirmation })

		const form = formRef.current;

		if (form && successMessage.length > 0) {
			form.reset();
		}
	}

	return (
		<section className="mt-5 form-register form-guest w-100 m-auto">

			<h1 className="h3 mb-3 fw-normal text-center">Change your Password</h1>

			{successMessage && <Alert variant="success">{successMessage}</Alert>}
			{errors?.alert && <Alert variant="danger">{errors.alert}</Alert>}

			<Form className="mb-4 needs-validation" ref={formRef} onSubmit={handleUpdatePassword} noValidate>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="password"
						placeholder="Old password"
						ref={oldPasswordRef}
						isInvalid={!!errors?.old_password}
					/>
					<Form.Label>Old password</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.old_password && errors.old_password[0]}
					</Form.Control.Feedback>
				</Form.Group>


				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="password"
						placeholder="New password"
						ref={newPasswordRef}
						isInvalid={!!errors?.new_password}
					/>
					<Form.Label>New password</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.new_password && errors.new_password[0]}
					</Form.Control.Feedback>
				</Form.Group>


				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="password"
						placeholder="New password Confirmation"
						ref={newPasswordConfirmationdRef}
						isInvalid={!!errors?.new_password_confirmation}
					/>
					<Form.Label>New password Confirmation</Form.Label>
					<Form.Control.Feedback type="invalid">
						{errors?.new_password_confirmation && errors.new_password_confirmation[0]}
					</Form.Control.Feedback>
				</Form.Group>

				<Button variant="primary" className="w-100 btn-lg" type="submit">Change password</Button>
			</Form>
		</section>
	)
}

export default ChangePassword
