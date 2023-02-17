import { useEffect, useState } from "react"
import AlertMessageComponent from "../components/AlertMessage"
import SuccessMessageComponent from "../components/SuccessMessage"
import { useAuthContext } from "../context/AuthContext"

const ChangePassword = () => {
	const [old_password, setOldPassword] = useState<string>("")
	const [new_password, setNewPassword] = useState<string>("")
	const [new_password_confirmation, setNewPasswordConfirmation] = useState<string>("")

	const { updatePassword, errors, successMessage } = useAuthContext()

	useEffect(() => {
		if(successMessage !== '') {
			setOldPassword('')
			setNewPassword('')
			setNewPasswordConfirmation('')
		}
	},[successMessage])

	const handleUpdatePassword = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		updatePassword({ old_password, new_password, new_password_confirmation })
	}

	return (
		<section className="mt-5 form-register form-guest w-100 m-auto">
			<form className="mb-4 needs-validation" onSubmit={handleUpdatePassword} noValidate>
				<h1 className="h3 mb-3 fw-normal text-center">Change your Password</h1>

				<SuccessMessageComponent successMessage={successMessage} />
				<AlertMessageComponent alertMessage={errors?.alert} />

				<div className="form-floating mb-2">
					<input
						type="password"
						value={old_password}
						onChange={(e) => setOldPassword(e.target.value)}
						placeholder="Old Password"
						className={`form-control ${errors?.old_password ? "is-invalid" : ""}`}
					/>
					{errors?.old_password && (
						<div className="invalid-feedback mb-3">
							{errors?.old_password[0]}
						</div>
					)}
					<label>Old Password</label>
				</div>

				<div className="form-floating mb-2">
					<input
						type="password"
						value={new_password}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="New Password"
						className={`form-control ${errors?.new_password ? "is-invalid" : ""}`}
					/>
					{errors?.new_password && (
						<div className="invalid-feedback mb-3">
							{errors.new_password[0]}
						</div>
					)}
					<label>New Password</label>
				</div>

				<div className="form-floating mb-2">
					<input
						type="password"
						value={new_password_confirmation}
						onChange={(e) => setNewPasswordConfirmation(e.target.value)}
						placeholder="New password confirmation"
						className={`form-control ${errors?.new_password_confirmation ? "is-invalid" : ""}`}
					/>
					{errors?.new_password_confirmation && (
						<div className="invalid-feedback mb-3">
							{errors?.new_password_confirmation[0]}
						</div>
					)}
					<label>New password confirmation</label>
				</div>

				<button className="w-100 btn btn-lg btn-primary" type="submit">Change password</button>

			</form>
		</section>
	)
}

export default ChangePassword
