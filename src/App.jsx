import React from 'react';
import PrimaryView from "./components/PrimaryView/PrimaryView";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";


export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/about">
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

// You can think of these components as "pages"
// in your app.

function Home() {
	return (
		<PrimaryView />
	);
}

