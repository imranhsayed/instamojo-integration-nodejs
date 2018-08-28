import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PaymentComplete from "./components/PaymentComplete";


class App extends Component {
	render() {
		return (
			// Provide provides the store to its child components inside of it.
			<Provider store={ store }>
				<Router>
					<div className="App">
						<Route exact path="/payment-complete" component={PaymentComplete} />
					</div>
				</Router>
			</Provider>
		);
	}
}



export default App;
