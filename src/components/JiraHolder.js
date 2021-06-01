import React, { useEffect, useState } from 'react';
import Constants from '../utils/Constants';
import JiraInputRow from './JiraInputRow';

const JiraHolder = () => {

    const [state, setState] = useState({
        jiras: [],
        lastRowId: 0
    });

    /**
     * Reset the rows on page load
     */
    useEffect(() => {
        resetRows();
    }, [])

    /**
     * Just debug logging
     */
    useEffect(() => {
        console.log("jasTrace: JIRAS state changed. Logging it");
        console.log(state);
    })

    const addRow = () => {
        const rowid = state.lastRowId + 1;
        var tempJiraStateHolder = state.jiras;
        tempJiraStateHolder.push(getJiraWithCustomRowId(rowid));
        setState({
            jiras: tempJiraStateHolder,
            lastRowId: rowid
        });
    }

    const deleteRow = (rowid) => {
        console.log(rowid);
        if (state.jiras.length > 1) {
            // filter out anything that does not match the provided rowid
            const remainders = state.jiras.filter((jira) => (jira.rowid !== rowid));
            setState({
                jiras: remainders,
                lastRowId: state.lastRowId
            });
        } else {
            alert("Cannot delete the last row");
        }
    }

    const resetRows = () => {
        setState({
            jiras: [getJiraWithCustomRowId(0)],
            lastRowId: 0
        });
    }

    const getJiraWithCustomRowId = (customRowId) => {
        // You need to clone the JSON object instead of making a reference to it using the "=" operator
        const aJira = JSON.parse(JSON.stringify(Constants.initialJiraValues));
        aJira.rowid = customRowId;
        return aJira;
    }

    const rowChanged = () => {
        console.log('jasTrace: row changed');
    }

    return (
        <div>
            <button onClick={addRow}>Add JIRA</button>
            <button onClick={resetRows}>Reset</button>
            <table id="jiraholdertable" className="table table-striped">
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
                        state.jiras.map(
                            (jira) =>
                                <tr key={jira.rowid}>
                                    <JiraInputRow rowid={jira.rowid} jira={jira} />
                                    <td><button onClick={function () { deleteRow(jira.rowid) }}>Delete Row {jira.rowid}</button></td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default JiraHolder;