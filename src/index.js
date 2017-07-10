import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const middleware = [thunk];

// For Redux Dev Tools Browser Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);
const root = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
registerServiceWorker();
