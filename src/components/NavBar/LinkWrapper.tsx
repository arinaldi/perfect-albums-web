import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';

interface Props {
  label: string;
  to: string;
}

const LinkWrapper: FC<Props> = ({ label, to }) => (
  <Box>
    <Link
      activeStyle={{ borderBottom: '2px solid white' }}
      as={NavLink}
      paddingBottom={1}
      to={to}
      _hover={{ color: 'white' }}
    >
      {label}
    </Link>
  </Box>
);

export default LinkWrapper;
