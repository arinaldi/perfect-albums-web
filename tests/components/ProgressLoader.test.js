import React from 'react';
import { render } from '@testing-library/react';

import ProgressLoader from '../../src/components/ProgressLoader/presenter';

test('ProgressLoader renders as visible', () => {
  const { getByRole } = render(<ProgressLoader isVisible />);
  const div = getByRole('progressbar').parentElement;

  expect(div.style.visibility).toEqual('visible');
});
