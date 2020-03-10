import React from 'react';
import { render } from '@testing-library/react';

import ProgressLoader from '../components/ProgressLoader/presenter';

test('ProgressLoader renders as visible', () => {
  const { container } = render(<ProgressLoader isVisible />);
  const div = container.querySelector('.progress');

  expect(div.style.visibility).toEqual('visible');
});

test('ProgressLoader renders as hidden', () => {
  const { container } = render(<ProgressLoader isVisible={false} />);
  const div = container.querySelector('.progress');

  expect(div.style.visibility).toEqual('hidden');
});
