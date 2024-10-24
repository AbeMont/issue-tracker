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

  // CREATE
  function handleAddIssues(issue) {
    setIssues(issues => [...issues, issue]);

    // If Abe is selected return the current sortedIssues array and add the new issue
    if(userSelected !== "") {
     // setUserSelected("");
     if(userSelected !== issue.assigned){
      setUserSelected("");
      setSortedIssues(sortedIssues => [...issues]);
     }

      setSortedIssues(sortedIssues => [...sortedIssues, issue]);
    } else {
      setSortedIssues(sortedIssues => [...sortedIssues, issue]);
    }

  }

  // DELETE
  function handleDeleteIssues(id) {
    const confirmed = window.confirm("Are you sure you want to delete this issue?");
    if(confirmed){
      setIssues(issues => issues.filter(issue => issue.id !== id));
      setSortedIssues(sortedIssues => issues.filter(issue => issue.id !== id));
    }
  }

  // UPDATE
  function handleOpenIssues(id) {
    setIssues(issues => issues.map(
      issue => issue.id === id ? {...issue, open: !issue.open} : issue
    ));
    setSortedIssues(sortedIssues => sortedIssues.map(
      issue => issue.id === id ? {...issue, open: !issue.open} : issue
    ))
  }

  function handleUpdateIssues(updatedIssue) {
    setIssues(issues => issues.map(
      issue => issue.id === updatedIssue.id ? {...issue, ...updatedIssue} : issue
    ));

    setSortedIssues(sortedIssues => sortedIssues.map(
      issue => issue.id === updatedIssue.id ? {...issue, ...updatedIssue} : issue
    ));
  }

   // Lets create a sorting feature by opened, closed, severity , and assigned to.
   // Needs form validation

   function handleShowOnlyByName(assigned, issues){
      console.log("Show User: ", assigned);

      if(assigned === 'all'){
        setSortedIssues([...issues]);
        setUserSelected("");
        return;
      }

      setSortedIssues(sortedIssues => [...issues].filter(issue => issue.assigned === assigned));
      setUserSelected(assigned);

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
          showOnlyByName={handleShowOnlyByName}/>
        <IssuesList 
          issues={sortedIssues}  
          onHandleDeleteIssues={handleDeleteIssues}
          onHandleOpenIssues={handleOpenIssues}
          onHandleUpdateIssue={handleUpdateIssues}/>
    </div>
  );
}

export default App;
