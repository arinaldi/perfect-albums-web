import {
  Flex,
  Link,
  Stack,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DISPATCH_TYPES, NAV_LINKS } from '../../constants';
import { useAppState, useAppDispatch } from '../Provider';

const MobileNavItem = ({ label, onClose, to }) => (
  <Stack spacing={4}>
    <Flex
      align="center"
      justify="space-between"
      py={2}
    >
      <Link
        activeStyle={{ fontWeight: 600 }}
        as={NavLink}
        to={to}
        _hover={{ color: 'white' }}
      >
        <span onClick={onClose}>{label}</span>
      </Link>
    </Flex>
  </Stack>
);

MobileNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

const MobileSignOut = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    onClose();
    dispatch({
      type: DISPATCH_TYPES.SIGN_OUT_USER,
    });
  };

  return (
    <Stack spacing={4}>
      <Flex
        align="center"
        justify="space-between"
        py={2}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Link>
          <span onClick={signOut}>Sign Out</span>
        </Link>
      </Flex>
    </Stack>
  );
};

MobileSignOut.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const MobileNav = ({ onClose }) => {
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Stack
      bg="gray.700"
      color="white"
      display={{ md: 'none' }}
      p={4}
    >
      {NAV_LINKS.map(({ label, needsAuth, to }) => {
        if (needsAuth && !isAuthenticated) {
          return null;
        }

        return (
          <MobileNavItem
            key={to}
            label={label}
            onClose={onClose}
            to={to}
          />
        );
      })}
      {isAuthenticated
        ? <MobileSignOut onClose={onClose} />
        : (
          <MobileNavItem
            label="Sign In"
            onClose={onClose}
            to="/signin"
          />
        )}
    </Stack>
  );
};

MobileNav.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MobileNav;
