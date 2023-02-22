import { useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import AlertMessageComponent from "../components/AlertMessage"
import SuccessMessageComponent from "../components/SuccessMessage"
import { useAuthContext } from "../context/AuthContext"

const ChangePassword = () => {
	const oldPasswordRef = useRef<HTMLInputElement | null>(null)
	const newPasswordRef = useRef<HTMLInputElement | null>(null)
	const newPasswordConfirmationdRef = useRef<HTMLInputElement | null>(null)

	const { updatePassword, errors, successMessage } = useAuthContext()

	useEffect(() => {
		if(successMessage !== '') {
			oldPasswordRef.current = null
			newPasswordRef.current = null
			newPasswordConfirmationdRef.current = null
		}
	},[successMessage])

	const handleUpdatePassword = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		const old_password = oldPasswordRef.current?.value || ''
		const new_password = newPasswordRef.current?.value || ''
		const new_password_confirmation = newPasswordConfirmationdRef.current?.value || ''

		updatePassword({ old_password, new_password, new_password_confirmation })
	}

	return (
		<section className="mt-5 form-register form-guest w-100 m-auto">

<h1 className="h3 mb-3 fw-normal text-center">Change your Password</h1>

			<SuccessMessageComponent successMessage={successMessage} />
			<AlertMessageComponent alertMessage={errors?.alert} />

			<Form className="mb-4 needs-validation" onSubmit={handleUpdatePassword} noValidate>

				<Form.Group className="form-floating has-validation mb-2">
					<Form.Control
						required
						type="password"
						placeholder="Old password"
						autoComplete="password"
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
