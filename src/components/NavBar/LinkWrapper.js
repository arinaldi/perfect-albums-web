import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const activeStyle = {
  fontWeight: 600,
};

const LinkWrapper = ({ label, to }) => (
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

LinkWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkWrapper;
