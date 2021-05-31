import React, { useEffect, useState } from 'react';

const JiraInputRow = () => {

    const initialValues = {
        summary: "",
        priority: "@inherit",
        assignee: "@current",
        fixversion: "@inherit",
        devpriority: "@inherit"
    };

    const [jira, setJira] = useState(initialValues);

    useEffect(() => {
        console.log(jira);
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
            <tr>
                <td><input name="summary" value={jira.summary} onChange={handleInputChanged}></input></td>
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
            </tr>
        </React.Fragment>
    )
}

export default JiraInputRow;