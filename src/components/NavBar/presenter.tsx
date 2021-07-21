import { FC } from 'react';
import {
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

import { NAV_LINKS } from '../../constants';
import useAuth from '../../hooks/useAuth';
import LinkWrapper from './LinkWrapper';
import SignOut from './SignOut';
import MobileNav from './MobileNav';

const NavBar: FC = () => {
  const { hasAuth } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        align="center"
        bg="gray.700"
        color="white"
        minHeight="60px"
        px={{ base: 4 }}
        py={{ base: 2 }}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            aria-label="Toggle navigation"
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            onClick={onToggle}
            variant="ghost"
            _active={{ background: 'gray.700' }}
            _hover={{ background: 'gray.700' }}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Heading
            color="white"
            minWidth="max-content"
            size="md"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
          >
            Perfect Albums
          </Heading>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {NAV_LINKS.map(({ label, needsAuth, to }) => {
              if (needsAuth && !hasAuth) {
                return null;
              }

              return <LinkWrapper key={to} label={label} to={to} />;
            })}
          </Flex>
        </Flex>
        <Stack
          alignItems="center"
          direction="row"
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          minWidth="fit-content"
          spacing={4}
        >
          <IconButton
            aria-label="Toggle dark mode"
            borderRadius="4px"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size="sm"
            variant="outline"
            _active={{ background: 'gray.700' }}
            _hover={{ background: 'gray.700' }}
          />
          <Box display={{ base: 'none', md: 'inline-flex' }}>
            {hasAuth ? (
              <SignOut />
            ) : (
              <LinkWrapper label="Sign In" to="/signin" />
            )}
          </Box>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav onClose={onClose} />
      </Collapse>
    </Box>
  );
};

export default NavBar;
