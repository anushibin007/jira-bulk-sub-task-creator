import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../css/heart.css";

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
					<div className="d-flex flex-column">
						<div className="p-2">
							Designed & Developed with <span className="heart animate__animated animate__heartBeat animate__infinite">♥</span> by <a href="https://github.com/anushibin007/jira-bulk-sub-task-creator">Anu Shibin Joseph Raj</a>
						</div>
						<div className="d-flex justify-content-center">
							{/* This line is to make an AJAX call to the update function. This will just increment the counter in the background */}
							<img src="https://www.freevisitorcounters.com/en/home/counter/836517/t/0" style={{ display: "none" }}></img>
							{/* This line shows the actual counter */}
							<img src="https://www.freevisitorcounters.com/en/counter/render/836517/t/0" border="0" className="counterimg"></img>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="info" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}
export default About;
