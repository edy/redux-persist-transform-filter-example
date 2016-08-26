import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate, storages } from 'redux-persist';
import createLogger from 'redux-logger';
import createFilter from 'redux-persist-transform-filter';
import reducers from './reducers';
import logo from './logo.svg';
import './App.css';

const enhancer = compose(
	applyMiddleware(createLogger()),
	autoRehydrate(),
	global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : (nope) => nope,
);

const store = createStore(reducers, undefined, enhancer);
const myFilter = createFilter('test', ['counter']);

class App extends Component {
    componentWillMount(){
        console.log('state before', store.getState());
        persistStore(store, {
            storage: storages.asyncSessionStorage,
    		transforms: [myFilter]
        }, (err, rehydratedState) => {
            console.log('rehydratedState', rehydratedState);
            console.log('state after', store.getState());
            this.setState({});
        });
    }
    render() {
        const counter = store.getState().test.counter;
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Counter: {counter}
                    <button onClick={() => {
                        store.dispatch({type: 'INCREMENT'});
                        this.setState({});
                    }}>INCREMENT</button>
                </p>
            </div>
        );
    }
}

export default App;
