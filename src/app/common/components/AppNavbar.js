import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, Container, NavLink, Fragment } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from '../../auth/components/Logout';
import { loadUser } from '../../auth/actions/authAction';

const AuthLinks = () => {
  return (
    <>
      <NavLink>
        <Link to="/movies">Movies</Link>
      </NavLink>
      <NavLink>
        <Link to="/movie-theaters">Movie theatres</Link>
      </NavLink>
      <NavLink>
        <Link to="/movie-times">Movie times</Link>
      </NavLink>
      <NavLink>
        <Link to="/settings">Settings</Link>
      </NavLink>
      <NavItem>
        <Logout />
      </NavItem>
    </>
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
    loadUser: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Cinema</NavbarBrand>
          <Nav className="ml-auto" navbar>
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

export default connect(mapStateToProps, { loadUser })(withRouter(AppNavbar));
