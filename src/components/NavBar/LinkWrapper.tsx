import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { NavLinkStyleProps } from '../../utils/types';

interface Props {
  label: string;
  to: string;
}

const LinkWrapper: FC<Props> = ({ label, to }) => {
  return (
    <Box>
      <NavLink
        style={({ isActive }: NavLinkStyleProps) => ({
          borderBottom: isActive ? '2px solid white' : '',
          paddingBottom: '4px',
        })}
        to={to}
      >
        {label}
      </NavLink>
    </Box>
  );
};

export default LinkWrapper;
