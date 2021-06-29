import React from 'react';
import { Box, Link } from '@chakra-ui/react';

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
    <Box>
      <Link>
        <span onClick={signOut}>Sign Out</span>
      </Link>
    </Box>
  );
};

export default SignOut;
