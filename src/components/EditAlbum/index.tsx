import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { MESSAGES, METHODS, STATE_STATUSES } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import api from '../../utils/api';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from '../CreateAlbum/presenter';

const EditAlbumContainer: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const [album, setAlbum] = useState({
    aotd: false,
    artist: '',
    cd: false,
    favorite: false,
    title: '',
    year: '',
  });
  const [state] = useStateMachine(`/api/albums/${id}`);
  const { data, status } = state;
  const isLoading = status === STATE_STATUSES.LOADING;
  const { mutate } = useAdminState();
  useTitle('Edit Album');

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS && data) {
      const { aotd, artist, cd, favorite, title, year } = data;
      setAlbum({ aotd, artist, cd, favorite, title, year });
    }
  }, [data, status]);

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

  function handleNavigate() {
    navigate(`/admin${search}`);
  }

  async function submitFn() {
    await api(`/api/albums/${id}`, { body: album, method: METHODS.PUT });
  }

  const options = {
    callbacks: [handleNavigate, mutate],
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <CreateEditAlbum
        data={album}
        isLoading={isLoading}
        isSaving={isSaving}
        header="Edit"
        onChange={handleChange}
        onRadioChange={handleRadioChange}
        onSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default EditAlbumContainer;
