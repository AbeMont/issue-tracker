
export default function Sort({issues, showOnlyByName, userSelected}){

    const options = [...new Map(issues.map(issue => [issue.assigned, issue])).values()];

    return (
        <div className="mb-3">
            <div className="row">
                <div className="col-sm-5">
                    <div className="form-group">
                        <label htmlFor="sortuser">Sort By Assigned</label>
                        <select id="sortuser" 
                            className="form-control form-select"
                            placeholder="Select Name"
                            value={userSelected !== "" ? userSelected : ""}
                            onChange={(e)=>showOnlyByName(e.target.value, issues)}>
                            <option value="all" >Show All Assignees...</option>
                            {options.map((issue) =>
                            <option value={issue.assigned} key={issue.id}>{issue.assigned}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}