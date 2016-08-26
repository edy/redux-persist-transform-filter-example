import { combineReducers } from 'redux';

const initialState = {
	someKey: 'someValue',
	counter: 0
};

const testReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				...state,
				counter: state.counter + 1
			};

		default:
			return state;
	}
};

const reducers = combineReducers({
	test: testReducer
});

export default reducers;
