import { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

interface Props {
  label: string;
  to: string;
}

const activeStyle = {
  fontWeight: 600,
};

const LinkWrapper: FC<Props> = ({ label, to }) => (
  <Box>
    <Link
      activeStyle={activeStyle}
      as={NavLink}
      p={2}
      to={to}
      _hover={{ color: 'white' }}
    >
      {label}
    </Link>
  </Box>
);

export default LinkWrapper;
