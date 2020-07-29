import React, { Component } from 'react';
import { Nav, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export const withMenu = (ComponentToWrap, menuItems) => {
  return class extends Component {
    render() {
      return (
        <Row>
          <Col xs="auto">
            <Nav vertical>
              <MenuItems items={menuItems} />
            </Nav>
          </Col>
          <Col>
            <ComponentToWrap {...this.props} />
          </Col>
        </Row>
      );
    }
  };
};

const MenuItems = props => {
  const items = props.items.map(item => {
    return <Link to={'/' + item.link}>{item.name}</Link>;
  });

  return items;
};
