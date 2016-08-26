import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate, storages } from 'redux-persist';
import createLogger from 'redux-logger';
import createFilter from 'redux-persist-transform-filter';
import reducers from './reducers';
import App from './App';
import './index.css';

const enhancer = compose(
	applyMiddleware(createLogger()),
	autoRehydrate(),
	global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : (nope) => nope,
);

const store = createStore(reducers, undefined, enhancer);
const myFilter = createFilter('test', ['counter']);

persistStore(store, {
	storage: storages.asyncSessionStorage,
	transforms: [myFilter]
}, (err, rehydratedState) => {
	console.log('rehydratedState', rehydratedState);
	console.log('state after', store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
