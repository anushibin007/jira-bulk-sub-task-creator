import React, { useEffect, useState } from 'react';
import Constants from '../utils/Constants';

const JiraInputRow = (props) => {

    const [jira, setJira] = useState(Constants.initialJiraValues);

    useEffect(() => {
        setJira({
            ...props.jira,
            rowid: props.rowid
        });
    }, [])

    useEffect(() => {
        //console.log(jira);
    })

    const handleInputChanged = (event) => {
        const { name, value } = event.target;
        setJira({
            ...jira,
            [name]: value,
        });
    }

    return (
        <React.Fragment>
            <td>RowId = {jira.rowid}<input name="summary" value={jira.summary} onChange={handleInputChanged}></input></td>
            <td>
                <select name="priority" value={jira.priority} onChange={handleInputChanged}>
                    <option value="@inherit">Inherit</option>
                    <option value="blocker">Blocker</option>
                    <option value="critical">Critical</option>
                    <option value="major">Major</option>
                    <option value="minor">Minor</option>
                    <option value="trivial">Trivial</option>
                </select>
            </td>
            <td>
                <select name="assignee" value={jira.assignee} onChange={handleInputChanged}>
                    <option value="@current">Me</option>
                    <option value="@inherit">Inherit</option>
                </select>
            </td>
            <td>
                <select name="fixversion" value={jira.fixversion} onChange={handleInputChanged}>
                    <option value="@inherit">Inherit</option>
                </select>
            </td>
            <td>
                <select name="devpriority" value={jira.devpriority} onChange={handleInputChanged}>
                    <option value="@inherit">Inherit</option>
                </select>
            </td>

        </React.Fragment>
    )
}

export default JiraInputRow;