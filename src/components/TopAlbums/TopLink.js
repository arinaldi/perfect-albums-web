import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { ICONS } from '../../constants';

const TopLink = () => (
  <Navbar fixed='bottom'>
    <Nav className='mr-auto' />
    <Nav>
      <Nav.Item>
        <Nav.Link href='#top'>
          {`${ICONS.UP} Top`}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
);

export default TopLink;
