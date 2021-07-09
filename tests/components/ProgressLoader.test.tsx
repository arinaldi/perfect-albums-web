import ProgressLoader from '../../src/components/ProgressLoader/presenter';
import render from '../utils';

test('ProgressLoader renders as visible', () => {
  const { getByRole } = render(<ProgressLoader isVisible />);
  const div = getByRole('progressbar').parentElement;

  expect(div?.style.visibility).toEqual('visible');
});
