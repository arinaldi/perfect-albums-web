import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { DISPATCH_TYPES } from '../../constants';
import { useAppDispatch } from '../Provider';

const SignOut = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch({
      type: DISPATCH_TYPES.SIGN_OUT_USER,
    });
  };

  return (
    <Nav.Link
      className='sign-out'
      eventKey='signout'
      active={false}
      as='div'
    >
      <span onClick={signOut}>Sign Out</span>
    </Nav.Link>
  );
};

export default SignOut;
