import { useState, useEffect } from "react";

function DateTime(){

    const currentDate = new Date().toLocaleDateString();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(()=>{

        const clock = setInterval(() => setCurrentTime(new Date().toLocaleTimeString(), 1000));
        return ()=>clearInterval(clock);
        
    },[currentTime]);

    return(
        <div id="time-date" className="mb-3">
            <p className="m-0">Current Date: {currentDate}</p>
            <p className="m-0">Current Time: {currentTime}</p>
        </div>
    )
}

export default DateTime;