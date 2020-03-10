import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useAppState } from '../Provider';
import LinkWrapper from './LinkWrapper';
import SignOut from './SignOut';

const NavBar = () => {
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Navbar
      collapseOnSelect
      bg='dark'
      variant='dark'
      expand='md'
      id='top'
    >
      <Navbar.Brand>Perfect Albums</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto navbar-nav'>
          <LinkWrapper to='/albums' label='Top Albums' />
          <LinkWrapper to='/perfect-songs' label='Perfect Songs' />
          <LinkWrapper to='/featured-songs' label='Featured Songs' />
          <LinkWrapper to='/new-releases' label='New Releases' />
          {isAuthenticated && <LinkWrapper to='/admin' label='Admin' />}
        </Nav>
        <Nav className='navbar-nav'>
          {isAuthenticated
            ? <SignOut />
            : <LinkWrapper to='/signin' label='Sign In' />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
