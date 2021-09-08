import { FC } from 'react';
import { Flex, Link, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '../../constants';
import useStore from '../../hooks/useStore';

interface ItemProps {
  label: string;
  onClose: () => void;
  to: string;
}

interface NavProps {
  onClose: () => void;
  onSignOut: () => void;
}

const MobileNavItem: FC<ItemProps> = ({ label, onClose, to }) => (
  <Stack spacing={4}>
    <Flex align="center" justify="space-between" py={2}>
      <Link
        activeStyle={{ borderBottom: '2px solid white' }}
        as={NavLink}
        to={to}
        _hover={{ color: 'white' }}
      >
        <span onClick={onClose}>{label}</span>
      </Link>
    </Flex>
  </Stack>
);

const MobileNav: FC<NavProps> = ({ onClose, onSignOut }) => {
  const user = useStore((state) => state.user);

  function handleClick() {
    onClose();
    onSignOut();
  }

  const MobileSignOut = (
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

  return (
    <Stack bg="gray.700" color="white" display={{ md: 'none' }} padding={4}>
      {NAV_LINKS.map(({ label, needsAuth, to }) => {
        if (needsAuth && !user) {
          return null;
        }

        return (
          <MobileNavItem key={to} label={label} onClose={onClose} to={to} />
        );
      })}
      {user ? (
        MobileSignOut
      ) : (
        <MobileNavItem label="Sign In" onClose={onClose} to="/signin" />
      )}
    </Stack>
  );
};

export default MobileNav;
