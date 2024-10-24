
import Issue from "./Issue";

export default function IssuesList({issues, onHandleDeleteIssues, onHandleOpenIssues, onHandleUpdateIssue}){
    console.log("Issue List rendered");
    return (
        issues.map(issue => <Issue 
            issueObj={issue} 
            deleteIssueHandler={onHandleDeleteIssues}
            openIssueHandler={onHandleOpenIssues}
            updateIssuerHandler={onHandleUpdateIssue}
            key={issue.id}/>).reverse()
    )
}