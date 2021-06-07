import "./App.css";
import Navigation from "./components/Navigation";
import JiraHolder from "./components/JiraHolder";
import ForkMeOnGitHub from "./components/ForkMeOnGithub";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";

function App() {
	return (
		<div className="App">
			<Navigation />
			<JiraHolder />
			<ForkMeOnGitHub />
		</div>
	);
}

export default App;
