import React from 'react';
import JiraInputRow from './JiraInputRow';

const JiraHolder = () => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Jira Summary</th>
                    <th>Jira Priority</th>
                    <th>Assignee</th>
                    <th>Fix Version</th>
                    <th>Dev Priority</th>
                </tr>
            </thead>
            <tbody>
                <JiraInputRow />
            </tbody>
        </table>
    )
}

export default JiraHolder;