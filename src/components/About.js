import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function About() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<React.Fragment>
			<Button variant="navbar-btn" onClick={handleShow}>
				About Me
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>About Me</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Designed & Developed with <span style={{ color: "red" }}>♥</span> by <a href="https://github.com/anushibin007/jira-bulk-sub-task-creator">Anu Shibin Joseph Raj</a>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}
export default About;
