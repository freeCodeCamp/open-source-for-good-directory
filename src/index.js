import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers';
import App from './containers/App';
import './main.css';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') middleware.push(createLogger());

const store = createStore(reducer, applyMiddleware(...middleware));
const root = document.getElementById('root');

const render = Comp =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Comp />
      </Provider>
    </AppContainer>,
    root,
  );

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));
