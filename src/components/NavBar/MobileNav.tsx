import { FC } from 'react';
import { Flex, Link, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '../../constants';
import useAuth from '../../hooks/useAuth';

interface ItemProps {
  label: string;
  onClose: () => void;
  to: string;
}

interface Props {
  onClose: () => void;
}

const MobileNavItem: FC<ItemProps> = ({ label, onClose, to }) => (
  <Stack spacing={4}>
    <Flex align="center" justify="space-between" py={2}>
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

const MobileSignOut: FC<Props> = ({ onClose }) => {
  const { signOut } = useAuth();

  function handleClick() {
    onClose();
    signOut();
  }

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
          <span onClick={handleClick}>Sign Out</span>
        </Link>
      </Flex>
    </Stack>
  );
};

const MobileNav: FC<Props> = ({ onClose }) => {
  const { hasAuth } = useAuth();

  return (
    <Stack bg="gray.700" color="white" display={{ md: 'none' }} p={4}>
      {NAV_LINKS.map(({ label, needsAuth, to }) => {
        if (needsAuth && !hasAuth) {
          return null;
        }

        return (
          <MobileNavItem key={to} label={label} onClose={onClose} to={to} />
        );
      })}
      {hasAuth ? (
        <MobileSignOut onClose={onClose} />
      ) : (
        <MobileNavItem label="Sign In" onClose={onClose} to="/signin" />
      )}
    </Stack>
  );
};

export default MobileNav;
