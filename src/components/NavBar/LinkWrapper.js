import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const activeStyle = {
  color: 'rgba(255,255,255,.75)',
};

const LinkWrapper = (props) => {
  const { to, label } = props;

  return (
    <Nav.Link eventKey={to} active={false} as='span'>
      <NavLink
        className='link'
        activeStyle={activeStyle}
        to={to}
      >
        {label}
      </NavLink>
    </Nav.Link>
  );
};

LinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LinkWrapper;
