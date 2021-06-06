import React from "react";
import { Accordion, Card } from "react-bootstrap";

const HowItWorks = () => {
	return (
		<Accordion>
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey="0">
					<h5>How it works</h5>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<ol>
							<li>Copy the text from the Results above</li>
							<li>Go to your parent JIRA</li>
							<li>Click on More → Create multiple sub-tasks</li>
							<li>Paste the content you copied from this page above</li>
							<li>Click on "Create Sub-Tasks"</li>
						</ol>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default HowItWorks;
