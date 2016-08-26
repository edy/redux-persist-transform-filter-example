import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const mapStateToProps = (state) => {
	return {
		counter: state.test.counter
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		increment: () => dispatch({type: 'INCREMENT'})
	};
};

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					Counter: {this.props.counter}
					<button onClick={this.props.increment}>INCREMENT</button>
				</p>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
