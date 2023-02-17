export const AlertMessageComponent = ({alertMessage}: any) => {
    return (<>
        {alertMessage && <div className="alert alert-danger" role="alert">{alertMessage}</div>}
    </>)
}