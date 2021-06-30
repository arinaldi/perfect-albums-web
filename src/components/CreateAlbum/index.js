import React, {
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQuery } from '../../utils';
import useSubmit from '../../hooks/useSubmit';
import { MESSAGES } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from './presenter';

const CreateAlbumContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [album, setAlbum] = useState({
    artist: '',
    title: '',
    year: (new Date()).getFullYear().toString(),
    cd: false,
    aotd: false,
    favorite: false,
  });
  const [query, setQuery] = useState('');
  const options = {
    body: album,
    callbacks: [() => history.push(`/admin?${query}`)],
    method: 'POST',
    path: '/api/albums',
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';

    setQuery(query);
  }, [location.search]);

  const handleChange = ({ target: { name, value } }) => {
    let newValue = value;

    if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    setAlbum({
      ...album,
      [name]: newValue,
    });
  };

  const handleRadioChange = ({ target: { name, value } }) => {
    setAlbum({
      ...album,
      [name]: value === 'true',
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={false} />
      <CreateEditAlbum
        data={album}
        isSaving={isSaving}
        query={query}
        header='Create'
        onChange={handleChange}
        onRadioChange={handleRadioChange}
        onSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default CreateAlbumContainer;
