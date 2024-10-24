import { useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function Form ({ onHandleAddIssues, issueObj, isUpdateModal, updateIssue }){

    const [description, setDescription] = useState(issueObj ? issueObj.description : "");
    const [severity, setSeverity] = useState(issueObj ? issueObj.severity : "");
    const [assigned, setAssigned] = useState(issueObj ? issueObj.assigned : "");
    const [value, onChange] = useState(issueObj ? issueObj.dueDate : new Date());

    const today = new Date();
    today.toDateString();

    function descriptionHandler(e){
        const value = e.target.value;
        setDescription(value);
    }

    function severityHandler(e){
        const value = e.target.value;
        setSeverity(value);
    }

    function handleAssign(e){
        const value = e.target.value;
        setAssigned(value);
    }

    function handleAddSubmit(e){

        e.preventDefault();

        if(description === "" || severity === "" || assigned === "") return;

        const newIssue = {
            id: crypto.randomUUID(),
            description: description,
            assigned: assigned,
            dateCreated: today.toDateString(),
            dueDate: new Date(value).toDateString(),
            open: true,
            severity: severity
        }

        onHandleAddIssues(newIssue);
        //onHandleSortedIssues([...issues, newIssue]);

    }

    function handleUpdateUser(e){
        e.preventDefault();
        const updatedIssue = {
            ...issueObj,
            description: description,
            dueDate: new Date(value).toDateString(),
            assigned: assigned,
            severity: severity 
        }
        updateIssue(updatedIssue);
         //updateSortedIssues([...issues, updatedIssue]);
    }

    return (
        <form className={ isUpdateModal ? "Is update Modal" : "Not-update-modal"} onSubmit={ isUpdateModal ? (e)=> handleUpdateUser(e) : (e)=>handleAddSubmit(e) }>

            <div className="form-group mb-2">
                <label htmlFor="issueDescInput">Description</label>
                <input type="text" 
                    className="form-control" 
                    id="issueDescInput" 
                    placeholder="What is the description of your issue?" 
                    value={description}
                    onChange={(e)=>{descriptionHandler(e)}}/>
                    {description === "" && <span><p className="text-danger m-0">*Description is required</p></span>} 
            </div>

            <div className="form-group mb-2">
                <label htmlFor="severityInput">Severity</label>
                <select 
                    id="severityInput" 
                    className="form-control form-select" 
                    value={severity}
                    onChange={(e)=>severityHandler(e)}>
                        <option value="">Urgency of Task</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                </select>
                {severity === "" && <span><p className="text-danger m-0">*Select Level of Urgency</p></span>}
            </div>

            <div className="form-group mb-2">
                <label htmlFor="assignInput">Assigned To</label>
                <input type="text" 
                    className="form-control" 
                    id="assignInput" 
                    placeholder="Enter Name"
                    value={assigned}
                    onChange={(e)=>handleAssign(e)}/>
                    {assigned === "" && <span><p className="text-danger m-0">*Individual is required</p></span>}  
            </div>

            <div className="form-group">
                <label htmlFor="dueDate">Due date: </label>
                <DatePicker 
                    className="react-date-picker mt-2"
                    minDate={new Date()} 
                    onChange={onChange} 
                    value={value}/>
            </div>

            

            {isUpdateModal ? 
                <div className="modal-footer pb-0 px-0 border-0">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div> 
                : 
                <button type="submit" className="btn btn-primary mt-3">Create Issue</button>
            }

        </form>
    )
}