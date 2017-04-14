import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers';
import App from './containers/App';
import './main.css';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware));
const root = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  root,
);

if (module.hot) module.hot.accept('./App', () => render(App));
