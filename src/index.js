import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader'

const AppWithHot = hot(module)(App);


ReactDOM.render(
  <Provider store={store}>
    <AppWithHot name='Dina'/>
  </Provider>,
  document.getElementById('app')
);
