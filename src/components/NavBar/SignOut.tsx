import { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';

import useAuth from '../../hooks/useAuth';

const SignOut: FC = () => {
  const { signOut } = useAuth();

  return (
    <Box>
      <Link>
        <span onClick={signOut}>Sign Out</span>
      </Link>
    </Box>
  );
};

export default SignOut;
