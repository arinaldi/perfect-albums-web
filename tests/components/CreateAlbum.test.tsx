import CreateAlbum from '../../src/components/CreateAlbum/presenter';
import { STATE_STATUSES } from '../../src/constants';
import render from '../utils';
import { mockAdminData } from '../mocks';

const { artist, title, year, cd, aotd, favorite } = mockAdminData[0];
const handleChange = () => jest.fn;
const handleRadioChange = () => jest.fn;
const handleSubmit = () => jest.fn;

test('CreateEditAlbum renders with data', () => {
  const { container, getByText } = render(
    <CreateAlbum
      data={mockAdminData[0]}
      header="Create"
      onChange={handleChange}
      onRadioChange={handleRadioChange}
      onSubmit={handleSubmit}
      status={STATE_STATUSES.SUCCESS}
    />,
  );
  const titleHeader = getByText('Create Album');
  const artistInput = container.querySelector('input[name=artist]') as HTMLInputElement;
  const titleInput = container.querySelector('input[name=title]') as HTMLInputElement;
  const yearInput = container.querySelector('input[name=year]') as HTMLInputElement;
  const cdInput = container.querySelector('input[name=cd][value=true]') as HTMLInputElement;
  const aotdInput = container.querySelector('input[name=aotd][value=true]') as HTMLInputElement;
  const favoriteInput = container.querySelector('input[name=favorite][value=true]') as HTMLInputElement;
  const cancelButton = getByText('Cancel');
  const saveButton = getByText('Save');

  expect(titleHeader).toBeInTheDocument();
  expect(artistInput.value).toBe(artist);
  expect(titleInput.value).toBe(title);
  expect(yearInput.value).toBe(year);
  expect(cdInput.checked).toBe(cd);
  expect(aotdInput.checked).toBe(aotd);
  expect(favoriteInput.checked).toBe(favorite);
  expect(cancelButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
