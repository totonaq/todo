import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  serialize: true
});

export default createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
