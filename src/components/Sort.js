
export default function Sort({issues, showOnlyByName, userSelected, showByCompletedStaus, status}){

    const options = [...new Map(issues.map(issue => [issue.assigned, issue])).values()];

    return (
        <div className="mb-3">
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="sortuser">Sort By Name</label>
                        <select id="sortuser" 
                            className="form-control form-select"
                            placeholder="Select Name"
                            value={userSelected !== "" ? userSelected : ""}
                            onChange={(e)=>showOnlyByName(e.target.value, issues)}>
                            <option value="all" >Show All Names...</option>
                            {options.map((issue) =>
                            <option value={issue.assigned} key={issue.id}>{issue.assigned}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="completedStatus">Sort By Completed/Closed</label>
                        <select id="completedStatus" 
                            className="form-control form-select"
                            placeholder="Select Name"
                            value={status}
                            onChange={(e)=> showByCompletedStaus(e.target.value)}>
                            <option value="show all" >Show All</option>
                            <option value="open" >Open</option>
                            <option value="closed" >Closed</option>
                        </select>
                    </div>
                    {/* <div className="h-100 d-flex flex-column justify-content-end">
                        <label class="form-check-label">
                            Sort By Completed Status 
                        </label>
                        <div class="form-check m-0">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                            <label class="form-check-label" htmlFor="flexRadioDefault1">
                                Open
                            </label>
                        </div>
                        <div class="form-check m-0">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                            <label class="form-check-label" htmlFor="flexRadioDefault2">
                                Closed
                            </label>
                        </div>
                    </div> */}
                </div>
                {/* <div className="col-md-4">
                
                    <label className="form-check-label">
                        Sort By Date 
                    </label>
                    <div className="d-flex">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Overdue
                            </label>
                        </div>
                        <div className="form-check m-0">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Upcoming
                            </label>
                        </div>
                    </div>
                  
                </div> */}

            </div>
        </div>
    )
}