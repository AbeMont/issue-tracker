import { useState } from "react";
import DateTime from './components/DateTime';
import Form from './components/Form';
import IssuesList from './components/IssuesList';
import Sort from './components/Sort';

const issuseArray = [
  {
    id: '21343985-b66d-46dc-98b2-938349d68a50',
    description: 'Build new React Components',
    assigned: 'Abraham Montoya',
    dateCreated: 'Sun Nov 27 2022',
    dueDate: 'Sun Dec 17 2024',
    open: true,
    severity: 'High'
  },
  {
    id: "06b7d71e-89db-5695-816c-f9455ce17a49",
    description: "Create data object",
    assigned: "Jake",
    dateCreated: 'Mon Dec 02 2022',
    dueDate: 'Wed Nov 10 2024',
    open: false,
    severity: "Low"
  },
  {
    id: "6f590f60-b431-4e9c-b02a-bb7f29aa65db",
    description: "Fix the Database",
    assigned: "Sunny",
    dateCreated: 'Tue Jan 24 2022',
    dueDate: 'Fri Feb 24 2025',
    open: false,
    severity: "High"
  }
];

function App() {

  const [issues, setIssues] = useState(issuseArray);
  const [sortedIssues, setSortedIssues] = useState([...issues]);
  const [userSelected, setUserSelected] = useState("");
  const [status, setStatus] = useState("show all");

  console.log("userSelected: ",userSelected);

  ////////////
  // CREATE
  ///////////
  function handleAddIssues(issue) {
    // Add new issue to the original top level array
    setIssues(issues => [...issues, issue]);

    // If user IS selected, meaning userSelected is NOT empty
    if(userSelected !== "") { // userSelected is a string as "Cindy" or "Sunny"

      // Check if userName is not the same person from the issue parameter
     if(userSelected !== issue.assigned){
      setUserSelected(""); // We set the the "Sort by name" <select> back to empty
      setSortedIssues(sortedIssues => [...issues, issue]); // Then copy the original array into the sorted issues array to display ALL the issues.
     }
     // if the UserSelected is the person from issue parameter,   
     else if(userSelected === issue.assigned){
      // We only need the current rendering from sortedIssues, NOT ALL THE ISSUES , and add the new issue for the current selected user
      setSortedIssues(sortedIssues => [...sortedIssues, issue]);
     }

    } else if(userSelected === "") {
      setSortedIssues(sortedIssues => [...sortedIssues, issue]);
    }

  }

  ////////////
  // DELETE
  ///////////
  function handleDeleteIssues(id) {
    const confirmed = window.confirm("Are you sure you want to delete this issue?");

    if(confirmed){

      setIssues(issues => issues.filter(issue => issue.id !== id));

      if(userSelected !== "") {
        if(sortedIssues.length === 1) {
          setSortedIssues(sortedIssues => issues.filter(issue => issue.id !== id ));
          setUserSelected("");
        } else {
          setSortedIssues(sortedIssues => sortedIssues.filter(sortedIssue => sortedIssue.id !== id ));
        }
  
      } else if (userSelected === "") {
        setSortedIssues(sortedIssues => sortedIssues.filter(sortedIssue => sortedIssue.id !== id));
      }

    }
  }

  ////////////
  // UPDATE
  ///////////

  // Update open/closed issue
  function handleOpenIssues(id) {
    setIssues(issues => issues.map(
      issue => issue.id === id ? {...issue, open: !issue.open} : issue
    ));
    setSortedIssues(sortedIssues => sortedIssues.map(
      sortedIssue => sortedIssue.id === id ? {...sortedIssue, open: !sortedIssue.open} : sortedIssue
    ))
  }

  // Update Description, severity, Assigned, and due date
  function handleUpdateIssues(updatedIssue) {
    setIssues(issues => issues.map(
      issue => issue.id === updatedIssue.id ? {...issue, ...updatedIssue} : issue
    ));

    if(userSelected !== ""){

      if(userSelected !== updatedIssue.assigned){
        setUserSelected("");
        setSortedIssues(sortedIssues => issues.map(
          issue => issue.id === updatedIssue.id ? {...issue, ...updatedIssue} : issue
        ))
      }

      if(userSelected === updatedIssue.assigned){
        setSortedIssues(sortedIssues => sortedIssues.map(
          sortedIssue => sortedIssue.id === updatedIssue.id ? {...sortedIssue, ...updatedIssue} : sortedIssue
        ))
      }

    } else {

        setSortedIssues(sortedIssues => sortedIssues.map(
          sortedIssue => sortedIssue.id === updatedIssue.id ? {...sortedIssue, ...updatedIssue} : sortedIssue
        ));
    }
  }

  /////////////
  // Sorting
  ////////////

  // Sort by name
  function handleShowOnlyByName(assigned, issues){

    if(assigned === 'all'){
      setSortedIssues([...issues]);

      if(status === "open"){
        setSortedIssues(sortedIssues => issues.filter(issue => issue.open));
      } else if(status === "closed"){
        setSortedIssues(sortedIssues => issues.filter(issue => issue.open === false));
      }
      setUserSelected("");

    } else if(assigned !== 'all'){
      if(status === "open"){
        setSortedIssues(sortedIssues => issues.filter(
          issue => issue.assigned === assigned && issue.open
        ))
      } else if(status === "closed"){
        setSortedIssues(sortedIssues => issues.filter(
          issue => issue.assigned === assigned && issue.open === false
        ))
      } else {
        setSortedIssues(sortedIssues => [...issues].filter(issue => issue.assigned === assigned));
      }
      setUserSelected(assigned);
    } else {
      setSortedIssues(sortedIssues => [...issues].filter(issue => issue.assigned === assigned));
      setUserSelected(assigned);
    }

  }

  // Sort By Completed
  function handleShowByStatus(val){
    console.log("Show by Completed status: ", val);

    if(val === "open"){

      if(userSelected === "") {
        setSortedIssues(sortedIssues => issues.filter(issue => issue.open));
      } else if(userSelected !== ""){
        setSortedIssues(sortedIssues => issues.filter(
          issue => issue.assigned === userSelected && issue.open
        ))
      }

      setStatus("open");

    } else if(val === "closed"){

      if(userSelected === "") {
        setSortedIssues(sortedIssues => issues.filter(issue => issue.open === false));
      } else if(userSelected !== ""){
        setSortedIssues(sortedIssues => issues.filter(
          issue => issue.assigned === userSelected && issue.open === false
        ))
      }
      
      setStatus("closed");
    } else if(val === "show all"){

      if(userSelected === "") { 
        setSortedIssues(sortedIssues => [...issues]);
       } else if(userSelected !== ""){
        setSortedIssues(sortedIssues => issues.filter(
          issue => issue.assigned === userSelected
        ))
      }
      
      setStatus("show all");
    }
    
  }

  return (
    <div className="container">

      <h1 className="my-3">Issue Tracker App</h1>

        <div className='issue-tracker-comtainer jumbotron p-4 mb-3'>
          <DateTime/>
          <h3>
            Add New Issue
          </h3>
          <Form 
            onHandleAddIssues={handleAddIssues}
            onHandleSortedIssues={setSortedIssues}
            issues={sortedIssues}
          />
        </div>

        <Sort 
          issues={issues}
          userSelected={userSelected}
          status={status}
          showOnlyByName={handleShowOnlyByName}
          showByCompletedStaus={handleShowByStatus}/>
        <IssuesList 
          issues={sortedIssues}  
          onHandleDeleteIssues={handleDeleteIssues}
          onHandleOpenIssues={handleOpenIssues}
          onHandleUpdateIssue={handleUpdateIssues}/>
    </div>
  );
}

export default App;
