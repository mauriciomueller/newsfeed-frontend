export const SuccessMessageComponent = ({successMessage}: any) => {
    return (<>
        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
    </>)
}