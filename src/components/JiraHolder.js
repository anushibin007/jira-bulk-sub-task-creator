import React, { useEffect, useState } from 'react';
import JiraInputRow from './JiraInputRow';

const JiraHolder = () => {

    const [jiras, setJiras] = useState([<JiraInputRow />]);

    useEffect(() => {
        console.log(jiras);
    })

    const addRow = () => {
        setJiras([
            ...jiras,
            <JiraInputRow />
        ]);
    }

    return (
        <div>
            <button onClick={addRow}>Add JIRA</button>
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
                    {
                        jiras.map((jira, i) => <tr key={i}>{jira}</tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default JiraHolder;