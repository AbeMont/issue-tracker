
export default function Sort({issues, showOnlyByName}){

    return (
        <div className="mb-3">
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="sortuser">Sort By Assigned</label>
                        <select id="sortuser" 
                            className="form-control"
                            placeholder="Select Name" 
                            onChange={(e)=>showOnlyByName(e.target.value)} defaultValue="">
                            <option value="" disabled selected hidden>Select User...</option>
                            {issues.map(issue => 
                            <option value={issue.assigned} key={issue.id}>{issue.assigned}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}