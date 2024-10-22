import React, { useEffect, useState } from "react";

export default function PrevTime(){

    const [yesterdayDate, setYesterdayDate] = useState("");
    
    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        //console.log(date.toDateString()); // Sun Nov 27 2022
       // console.log(date.toLocaleString()); // 11/27/2022, 8:52:43 PM

        setYesterdayDate(date.toLocaleDateString());
    }, []);

    return (
        <div id='prev-time'>
            Pervious Day: {yesterdayDate}
        </div>
    )
}