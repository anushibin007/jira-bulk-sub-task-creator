import React, { useEffect, useState } from 'react';
import JiraInputRow from './JiraInputRow';

const JiraHolder = () => {

    const [state, setState] = useState({
        jiras: [],
        lastRowId: 0
    });

    useEffect(() => {
        resetRows();
    }, [])

    useEffect(() => {
        console.log("jasTrace: JIRAS state changed. Logging it");
        console.log(state);
    })

    const addRow = () => {
        const rowid = state.lastRowId + 1;
        setState({
            jiras: [
                ...state.jiras,
                <JiraInputRow rowid={rowid} />
            ],
            lastRowId: rowid
        });
    }

    const deleteRow = (index) => {
        console.log(index);
        if (state.jiras.length > 1) {
            const remainders = state.jiras.filter((el, i) => {
                if (i != index) {
                    console.log(i + ' true')
                    return el;
                }
            });
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
            jiras: [<JiraInputRow rowid={0} />],
            lastRowId: 0
        });
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
                        state.jiras.map((jira, i) =>
                            <tr key={jira.props.rowid}>
                                {jira}
                                <td><button onClick={function () { deleteRow(i) }}>Delete Row {i}</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default JiraHolder;