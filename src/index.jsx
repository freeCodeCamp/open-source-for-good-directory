import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers';
import App from './containers/App';
import './main.css';

const middleware = [thunk];

// For Redux Dev Tools Browser Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
   applyMiddleware(...middleware),
  ),
);
const root = document.getElementById('root');

const hotRender = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root,
  );
};

hotRender(App);

if (module.hot) module.hot.accept(App, () => hotRender(App));
