import { ChangeEvent, FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MESSAGES, METHODS } from '../../constants';
import useSubmit from '../../hooks/useSubmit';
import api from '../../utils/api';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from './presenter';

const CreateAlbumContainer: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [album, setAlbum] = useState({
    artist: '',
    title: '',
    year: new Date().getFullYear().toString(),
    cd: false,
    aotd: false,
    favorite: false,
  });

  function handleNavigate() {
    navigate(`/admin${search}`);
  }

  async function submitFn() {
    await api('/api/albums', { body: album, method: METHODS.POST });
  }

  const options = {
    callbacks: [handleNavigate],
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;
    let newValue = value;

    if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    setAlbum({
      ...album,
      [name]: newValue,
    });
  }

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;

    setAlbum({
      ...album,
      [name]: value === 'true',
    });
  }

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={false} />
      <CreateEditAlbum
        data={album}
        isSaving={isSaving}
        header="Create"
        onChange={handleChange}
        onRadioChange={handleRadioChange}
        onSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default CreateAlbumContainer;
