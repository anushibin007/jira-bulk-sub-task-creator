import React from "react";

const JiraResults = (props) => {
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

	const copyToClipboard = (event) => {
		try {
			// Get the data that needs to be copied
			var results = document.getElementById("results").innerHTML;
			// Make sure to replace line breaks with newline character
			results = results.replaceAll("<br>", "\n");

			// Only "textarea" and "input" fields can be "selected" for copying.
			// Hence, create a temp textarea element with our data and copy the data from it.
			var input = document.createElement("textarea");
			input.innerHTML = results;
			document.body.appendChild(input);
			input.select();
			document.execCommand("copy");
			document.body.removeChild(input);

			// Show that the copy was successful
			showCopyDone(event, true);
		} catch (error) {
			// If it failed, log the error and show an error prompt to the user
			console.error(error);
			showCopyDone(event, false);
		}
	};

	/**
	 * Updates the "Copy" button to give feedback to the user whether the copy passed or failed.
	 *
	 * @param {*} event
	 * @param {*} passOrFail True if the copy was successful. False otherwise
	 */
	const showCopyDone = (event, passOrFail) => {
		// change text and the button color to show that copy was done/failed
		if (passOrFail) {
			event.target.innerHTML = '<i class="bi bi-clipboard-check"></i> Copied';
			event.target.className = "btn btn-success";
		} else {
			event.target.innerHTML = '<i class="bi bi-clipboard-x"></i> Copy Failed';
			event.target.className = "btn btn-danger";
		}

		// change it back to the old text and color after a second
		setTimeout(() => {
			event.target.innerHTML = '<i class="bi bi-clipboard-plus"></i> Copy Results';
			event.target.className = "btn btn-primary";
		}, 1000);
	};

	return (
		<div>
			<h5>Results:</h5>
			<code id="results">{props.jiras.map((jira) => getResultLine(jira))}</code>
			<br />
			<p className="btn btn-primary" onClick={copyToClipboard}>
				<i className="bi bi-clipboard-plus"></i> Copy Results
			</p>
		</div>
	);
};

export default JiraResults;