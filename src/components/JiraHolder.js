import React, { useEffect, useState } from "react";
import Constants from "../utils/Constants";
import HowItWorks from "./HowItWorks";
import JiraResults from "./JiraResults";

const JiraHolder = () => {
	/**
	 * The state consists of an array of jiras and the lastRowId used.
	 */
	const [state, setState] = useState({
		jiras: [],
		lastRowId: 0,
	});

	/**
	 * On initial page load, check if the old state is cached in local storage.
	 * If nothing is found there, just show one empty row by calling the "reset" function.
	 */
	useEffect(() => {
		const stateFromLocalStorage = localStorage.getItem(Constants.localStorageKey);
		if (stateFromLocalStorage) {
			setState(JSON.parse(stateFromLocalStorage));
		} else {
			resetRows();
		}
	}, []);

	/**
	 * Store the state to the local storage whenever it changes.
	 * If the browser session was closed or refreshed, the user can continue from where they left.
	 */
	useEffect(() => {
		localStorage.setItem(Constants.localStorageKey, JSON.stringify(state));
	});

	/**
	 * Add a new row. The rowid of the new row will be one more than the lastrowId.
	 * The new row will be filled with default values.
	 */
	const addRow = () => {
		const rowid = state.lastRowId + 1;
		var tempJiraStateHolder = state.jiras;
		tempJiraStateHolder.push(getJiraWithCustomRowId(rowid));
		setState({
			jiras: tempJiraStateHolder,
			lastRowId: rowid,
		});
	};

	/**
	 * Deletes a row. The last row cannot be deleted.
	 * When trying to delete the last row, an error message is shown.
	 * @param {*} event
	 * @param {*} rowid
	 */
	const deleteRow = (event, rowid) => {
		if (state.jiras.length > 1) {
			// filter out anything that does not match the provided rowid
			const remainders = state.jiras.filter((jira) => jira.rowid !== rowid);
			setState({
				jiras: remainders,
				lastRowId: state.lastRowId,
			});
		} else {
			event.target.innerHTML = '<i class="bi bi-exclamation-circle"></i> Cannot delete the only row';
			setTimeout(() => {
				event.target.innerHTML = '<i class="bi bi-trash"></i> Delete Row';
			}, 2000);
		}
	};

	/**
	 * Clear the table and show only one row with default rows.
	 */
	const resetRows = () => {
		setState({
			jiras: [getJiraWithCustomRowId(0)],
			lastRowId: 0,
		});
	};

	/**
	 * Get  a JIRA JSON with customized rowid.
	 * @param {*} customRowId
	 * @returns
	 */
	const getJiraWithCustomRowId = (customRowId) => {
		// You need to clone the JSON object instead of making a reference to it using the "=" operator
		const aJira = JSON.parse(JSON.stringify(Constants.initialJiraValues));
		aJira.rowid = customRowId;
		return aJira;
	};

	/**
	 * This method handles any input change in the table.
	 * The state JSON is updated accordingly based on the rowid, which we get from the id of the row.
	 * @param {*} event
	 */
	const handleInputChanged = (event) => {
		// get the name and value of the field that was updated
		const { name, value } = event.target;

		// rowid is stored as "id" in the <tr> element which has the input field
		const rowid = parseInt(event.target.parentNode.parentNode.id);

		// update the value by matching the rowid
		var tempJiraStateHolder = state.jiras;
		for (var i = 0; i < tempJiraStateHolder.length; i++) {
			var aJira = tempJiraStateHolder[i];
			if (aJira.rowid === rowid) {
				aJira[name] = value;
			}
		}

		// update the state
		setState({
			jiras: tempJiraStateHolder,
			lastRowId: state.lastRowId,
		});
	};

	return (
		<div className="container w-100">
			<div className="table-responsive">
				<table id="jiraholdertable" className="table table-bordered table-hover">
					<thead>
						<tr>
							<th className="text-center">Jira Summary</th>
							<th className="text-center">Description</th>
							<th className="text-center">Priority</th>
							<th className="text-center">Assignee</th>
							<th className="text-center">Fix Version</th>
							<th className="text-center">Dev Priority</th>
							<th className="text-center">Deletions</th>
						</tr>
					</thead>
					<tbody>
						{state.jiras.map((jira) => (
							<tr key={jira.rowid} id={jira.rowid}>
								<td className="w-25">
									<input className="form-control" name="summary" value={jira.summary} onChange={handleInputChanged} autoFocus></input>
								</td>
								<td className="w-25">
									<textarea className="form-control" rows="1" name="description" value={jira.description} onChange={handleInputChanged}></textarea>
								</td>
								<td>
									<select className="btn btn-secondary dropdown-toggle  w-100" name="priority" value={jira.priority} onChange={handleInputChanged}>
										<option value="@inherit">Inherit</option>
										<option value="Blocker">Blocker</option>
										<option value="Critical">Critical</option>
										<option value="Major">Major</option>
										<option value="Minor">Minor</option>
										<option value="Trivial">Trivial</option>
									</select>
								</td>
								<td>
									<select className="btn btn-secondary dropdown-toggle  w-100" name="assignee" value={jira.assignee} onChange={handleInputChanged}>
										<option value="@current">Me</option>
										<option value="@inherit">Inherit</option>
									</select>
								</td>
								<td>
									<select className="btn btn-secondary dropdown-toggle  w-100" name="fixversion" value={jira.fixversion} onChange={handleInputChanged}>
										<option value="@inherit">Inherit</option>
									</select>
								</td>
								<td>
									<select className="btn btn-secondary dropdown-toggle  w-100" name="devpriority" value={jira.devpriority} onChange={handleInputChanged}>
										<option value="@inherit">Inherit</option>
									</select>
								</td>
								<td>
									<button
										className="btn btn-danger w-100"
										onClick={function (event) {
											deleteRow(event, jira.rowid);
										}}
									>
										<i className="bi bi-trash"></i> Delete Row
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="d-flex flex-column">
				<p className="btn btn-success float-right" onClick={addRow}>
					<i className="bi bi-plus-circle"></i> Add Sub-task
				</p>
				<p className="btn btn-warning float-right" onClick={resetRows}>
					<i className="bi bi-x-octagon"></i> Reset
				</p>
			</div>

			<br />

			<JiraResults jiras={state.jiras} />

			<br />

			<HowItWorks />
		</div>
	);
};

export default JiraHolder;
