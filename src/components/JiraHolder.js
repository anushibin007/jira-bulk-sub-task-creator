import React, { useEffect, useState } from "react";
import Constants from "../utils/Constants";

const JiraHolder = () => {
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
		console.log("jasTrace: JIRAS state changed. Logging it");
		console.log(state);
		localStorage.setItem(Constants.localStorageKey, JSON.stringify(state));
	});

	const addRow = () => {
		const rowid = state.lastRowId + 1;
		var tempJiraStateHolder = state.jiras;
		tempJiraStateHolder.push(getJiraWithCustomRowId(rowid));
		setState({
			jiras: tempJiraStateHolder,
			lastRowId: rowid,
		});
	};

	const deleteRow = (rowid) => {
		console.log(rowid);
		if (state.jiras.length > 1) {
			// filter out anything that does not match the provided rowid
			const remainders = state.jiras.filter((jira) => jira.rowid !== rowid);
			setState({
				jiras: remainders,
				lastRowId: state.lastRowId,
			});
		} else {
			alert("Cannot delete the last row");
		}
	};

	const resetRows = () => {
		setState({
			jiras: [getJiraWithCustomRowId(0)],
			lastRowId: 0,
		});
	};

	const copyToClipboard = (event) => {
		var results = document.getElementById("results").innerHTML;
		// make sure to replace line breaks with newline character
		results = results.replaceAll("<br>", "\n");
		navigator.clipboard.writeText(results);
		showCopyDone(event);
	};

	const showCopyDone = (event) => {
		// change text and the button color to show that copy was done
		event.target.innerHTML = '<i class="bi bi-clipboard-check"></i> Copied';
		event.target.className = "btn btn-success";

		// change it back to the old text and color after a second
		setTimeout(() => {
			event.target.innerHTML = '<i class="bi bi-clipboard-plus"></i> Copy Results';
			event.target.className = "btn btn-primary";
		}, 1000);
	};

	const getJiraWithCustomRowId = (customRowId) => {
		// You need to clone the JSON object instead of making a reference to it using the "=" operator
		const aJira = JSON.parse(JSON.stringify(Constants.initialJiraValues));
		aJira.rowid = customRowId;
		return aJira;
	};

	const getResultLine = (jira) => {
		if (jira.summary !== "") {
			return (
				<React.Fragment key={jira.rowid}>
					- {jira.summary} / description:"{jira.description}" priority:"
					{jira.priority}" assignee:"{jira.assignee}" fixversion:"
					{jira.fixversion}" cfield:"DevPriority:{jira.devpriority}"
					<br />
				</React.Fragment>
			);
		}
	};

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
									<input className="form-control" name="summary" value={jira.summary} onChange={handleInputChanged}></input>
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
										onClick={function () {
											deleteRow(jira.rowid);
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

			<hr />

			<h5>Results:</h5>
			<code id="results">{state.jiras.map((jira) => getResultLine(jira))}</code>
			<br />
			<p className="btn btn-primary" onClick={copyToClipboard}>
				<i className="bi bi-clipboard-plus"></i> Copy Results
			</p>
			<hr />
			<h5>How it works:</h5>
			<ol>
				<li>Copy the text from the Results above</li>
				<li>Go to your parent JIRA</li>
				<li>Click on More → Create multiple sub-tasks</li>
				<li>Paste the content you copied from this page above</li>
				<li>Click on "Create Sub-Tasks"</li>
			</ol>
			<a className="github-fork-ribbon right-top" href="https://github.com/anushibin007/jira-bulk-sub-task-creator" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">
				Fork me on GitHub
			</a>
		</div>
	);
};

export default JiraHolder;
