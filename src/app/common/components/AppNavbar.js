import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, Container, NavLink, Fragment } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from '../../auth/components/Logout';

const AuthLinks = () => {
  return (
    <NavItem>
      <Logout />
    </NavItem>
  );
};

const GuestLinks = () => {
  return (
    <>
      <NavLink>
        <Link to="/signup">Sign Up</Link>
      </NavLink>
      <NavLink>
        <Link to="/login">Log In</Link>
      </NavLink>
    </>
  );
};

class AppNavbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Cinema</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavLink>
              <Link to="/movies">Movies</Link>
            </NavLink>
            <NavLink>
              <Link to="/movie-theaters">Movie theatres</Link>
            </NavLink>
            <NavLink>
              <Link to="/movie-times">Movie times</Link>
            </NavLink>
            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
});

export default connect(mapStateToProps, null)(withRouter(AppNavbar));
