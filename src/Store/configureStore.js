import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index.reducer';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'; 

const middlewares = [
	createLogger(),
	thunkMiddleware
];

export default function configureStore({ initialState }) {
	const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

	if(module.hot){
		// enable webpack hot module replacement for reducers
		module.hot.accept('../reducers/index.reducer', () => {
			// `default` is to extract the default entity from the export. 
			const nextReducer = require('../reducers/index.reducer').default; 
			store.replaceReducer(nextReducer);
		});
 	}

 	return store;

}