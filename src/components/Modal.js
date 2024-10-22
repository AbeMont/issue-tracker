import Form from './Form'

export default function Modal({issue, modalId, updateIssue }) {
    return (
        <div className="modal fade" id={`editModal-${modalId}`} tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Issue</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form issueObj={issue} isUpdateModal={true} updateIssue={updateIssue}/>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>updateUser(issue)}>Save changes</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}