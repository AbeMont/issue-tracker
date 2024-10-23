import { useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function Form ({ onHandleAddIssues, issueObj, isUpdateModal, updateIssue }){

    const [description, setDescription] = useState(issueObj ? issueObj.description : "");
    const [severity, setSeverity] = useState(issueObj ? issueObj.severity : "");
    const [assigned, setAssigned] = useState(issueObj ? issueObj.assigned : "");
    const [value, onChange] = useState(issueObj ? issueObj.dueDate : new Date());
    // const [dueDate, setDueDate] = useState(issueObj ? issueObj.dueDate : "");
    // const [formattedDateValue, setFormattedDateValue] = useState(new Date(value).toDateString());

    const today = new Date();
    today.toDateString();

    function descriptionHandler(e){
        const value = e.target.value;
        setDescription(value);
        console.log(value);
    }

    function severityHandler(e){
        const value = e.target.value;
        setSeverity(value);
        console.log(value);
    }

    function handleAssign(e){
        const value = e.target.value;
        setAssigned(value);
        console.log(value);
    }

    // function handleDateValue(e){

    //    // const dueDateValue = new Date(e.target.value);
    //     // const day = dueDateValue.getUTCDate();
    //     // const dayOfWeek = dueDateValue.getUTCDay();
    //     // const month = dueDateValue.getUTCMonth(); // Return Value is 0 indexed
    //     // const year = dueDateValue.getUTCFullYear();
    //     // const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    //     // console.log("Week Day: ", weekDays[dayOfWeek] , "Month: ", month, "Day: ", day, "Year: ", year);

    //     console.log(e.target.value);

    //     // console.log(dueDateValue.toDateString());
    //     // console.log("Due Date ISO: ", dueDateValue.toISOString().slice(0,10));
    //     // console.log("Get day: ", dueDateValue);

    //     // Update our Date Picker value to the correct format yyyy-mm-dd
    //     setDueDate(new Date(value).toDateString());

    //     // Create our new date Prop as Thu Oct 24 2024
    //     //setFormattedDateValue(e.target.value);


    // }

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
        console.log(onHandleAddIssues)

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
                {/* <input type="date" 
                    className="form-control date-picker" 
                    id="dueDate"
                    min={today.toLocaleDateString('en-ca')}
                    name="Due Date" 
                    value={dueDate}
                    onChange={(e)=>handleDateValue(e)} /> */}

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