import React, {
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
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
    apiFunc: Api.post,
    callbacks: [() => history.push(`/admin?${query}`)],
    data: album,
    path: '/api/albums',
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSaving, isValidated } = useSubmit(options);

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

  const handleRadioChange = (value, e) => {
    setAlbum({
      ...album,
      [e.target.name]: value,
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={false} />
      <CreateEditAlbum
        data={album}
        isValidated={isValidated}
        isSaving={isSaving}
        query={query}
        header='Create'
        handleChange={handleChange}
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default CreateAlbumContainer;
