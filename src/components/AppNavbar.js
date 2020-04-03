import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, Container, NavLink, Fragment } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logout from './auth/Logout';
import PropTypes from 'prop-types';

const AuthLinks = () => {
  return (
    <NavItem>
      <Logout />
    </NavItem>
  );
};

const GuestLinks = () => {
  return (
    <Container>
      <NavLink>
        <Link to="/signup">Sign Up</Link>
      </NavLink>
      <NavLink>
        <Link to="/login">Log In</Link>
      </NavLink>
    </Container>
  );
};

class AppNavbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Cinema</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
