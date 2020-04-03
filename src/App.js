/* eslint-disable */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import Routes from './Routes';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <AppNavbar />
          <Container>
            <Routes />
          </Container>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
