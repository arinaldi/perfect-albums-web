import React, {
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import { MESSAGES, STATE_STATUSES } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from '../CreateAlbum/presenter';

const EditAlbumContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [album, setAlbum] = useState({
    artist: '',
    title: '',
    year: '',
    cd: false,
    aotd: false,
    favorite: false,
  });
  const [query, setQuery] = useState('');
  const [state] = useStateMachine(`/api/albums/${id}`, true);
  const { data, status } = state;
  const isLoading = status === STATE_STATUSES.LOADING;
  const options = {
    apiFunc: Api.put,
    callbacks: [() => history.push(`/admin?${query}`)],
    data: album,
    path: `/api/albums/${id}`,
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { handleSubmit, isSaving, isValidated } = useSubmit(options);

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';

    setQuery(query);
  }, [location.search]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      setAlbum(data);
    }
  }, [data, status]);

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
      <ProgressLoader isVisible={isLoading} />
      <CreateEditAlbum
        data={album}
        isValidated={isValidated}
        isLoading={isLoading}
        isSaving={isSaving}
        query={query}
        header='Edit'
        handleChange={handleChange}
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default EditAlbumContainer;
