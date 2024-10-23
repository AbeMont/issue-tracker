import Modal from "./Modal";

export default function Issue({issueObj, deleteIssueHandler, openIssueHandler, updateIssuerHandler}){

    return(
        <div className="well first-item" id={issueObj.id}>

            <h6 className="font-weight-400 mb-1">Issue ID: {issueObj.id}</h6>

            <h6><b>Date Created: {issueObj?.dateCreated}</b></h6>
            <span className={`label ${issueObj.open ? 'label-info' : 'label-success'}`}>{issueObj.open ? 'open' : 'closed'}</span>

            <h3 className="mt-3 mb-3">{issueObj.description}</h3>

            <p className="m-0"><span className="glyphicon glyphicon-time"></span><b>Priority: </b> {issueObj.severity}</p>
            <p className="mb-0"><i className="bi bi-person-fill"></i>{issueObj.assigned}</p>
            <p className="mb-3"><i className="bi bi-alarm"></i><b>Due Date: </b> {issueObj.dueDate} </p>


            <button 
                className={`btn ${issueObj.open ? 'btn-success' : 'btn-primary'}`} 
                onClick={()=>openIssueHandler(issueObj.id)}>
                {issueObj.open ? 'Close Issue' : 'Reopen Issue'}
            </button>

            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#editModal-${issueObj.id}`}>Edit Issue</button>

            <button className="btn btn-danger" onClick={()=>deleteIssueHandler(issueObj.id)}>Delete</button>

            <Modal issue={issueObj} modalId={issueObj.id} updateIssue={updateIssuerHandler}/>

        </div>
    )
}