import { NavLink } from 'react-router-dom';
import { Flex, Link, Stack } from '@chakra-ui/react';

import { NAV_LINKS } from '../../constants';
import useStore from '../../hooks/useStore';
import { NavLinkStyleProps } from '../../utils/types';

interface ItemProps {
  label: string;
  onClose: () => void;
  to: string;
}

interface NavProps {
  onClose: () => void;
  onSignOut: () => void;
}

function MobileNavItem({ label, onClose, to }: ItemProps) {
  return (
    <Stack spacing={4}>
      <Flex align="center" justify="space-between" py={2}>
        <NavLink
          style={({ isActive }: NavLinkStyleProps) => ({
            borderBottom: isActive ? '2px solid white' : '',
            paddingBottom: '2px',
          })}
          to={to}
        >
          <span onClick={onClose}>{label}</span>
        </NavLink>
      </Flex>
    </Stack>
  );
}

export default function MobileNav({ onClose, onSignOut }: NavProps) {
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
}
