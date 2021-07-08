import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getQuery } from '../../utils';
import { AlbumParams, Method } from '../../utils/types';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import { MESSAGES, STATE_STATUSES } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from '../CreateAlbum/presenter';

const EditAlbumContainer: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams<AlbumParams>();
  const [album, setAlbum] = useState({
    aotd: false,
    artist: '',
    cd: false,
    favorite: false,
    title: '',
    year: '',
  });
  const [query, setQuery] = useState('');
  const [state] = useStateMachine(`/api/albums/${id}`);
  const { data, status } = state;
  const isLoading = status === STATE_STATUSES.LOADING;
  const options = {
    body: album,
    callbacks: [() => history.push(`/admin?${query}`)],
    method: Method.put,
    path: `/api/albums/${id}`,
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';

    setQuery(query);
  }, [location.search]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS && data) {
      const { aotd, artist, cd, favorite, title, year } = data;
      setAlbum({ aotd, artist, cd, favorite, title, year });
    }
  }, [data, status]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    let newValue = value;

    if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    setAlbum({
      ...album,
      [name]: newValue,
    });
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;

    setAlbum({
      ...album,
      [name]: value === 'true',
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <CreateEditAlbum
        data={album}
        isLoading={isLoading}
        isSaving={isSaving}
        query={query}
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
