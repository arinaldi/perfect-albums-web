import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { DECADES } from '../../constants';

const DecadeSelector = () => (
  <DropdownButton
    variant='outline-dark'
    style={{ display: 'inline-block' }}
    title='Jump to decade '
  >
    {DECADES.map(({ label, link }) => (
      <Dropdown.Item
        key={label}
        href={link}
      >
        {label}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);

export default DecadeSelector;
