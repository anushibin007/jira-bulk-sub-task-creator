import "../css/navbar.css";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import About from "./About";

function Navigation() {
	return (
		<div>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand>Jira Bulk Subtask Creator</Navbar.Brand>
				<Navbar.Toggle aria-controls="jsc-navbar" />
				<Navbar.Collapse id="jsc-navbar">
					<Nav className="mr-auto">
						<About />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Navigation;
