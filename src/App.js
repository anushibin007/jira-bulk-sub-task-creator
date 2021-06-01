import "./App.css";
import JiraHolder from "./components/JiraHolder";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	return (
		<div className="App">
			<Navigation />
			<JiraHolder />
		</div>
	);
}

export default App;
