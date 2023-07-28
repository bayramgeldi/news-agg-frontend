export const Loading = () => {
    return (
        <div className={"mt-5"}>
            <div className="text-center">
                <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
