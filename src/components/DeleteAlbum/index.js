import React, {
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getQuery } from '../../utils';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import { MESSAGES, STATE_STATUSES } from '../../constants';

import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import DeleteAlbum from './presenter';

const DeleteAlbumContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [query, setQuery] = useState('');
  const [state] = useStateMachine(`/api/albums/${id}`);
  const { data, status } = state;
  const options = {
    body: null,
    callbacks: [() => history.push(`/admin?${query}`)],
    method: 'DELETE',
    path: `/api/albums/${id}`,
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';

    setQuery(query);
  }, [location.search]);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <DeleteAlbum
        data={data}
        isDeleting={isSaving}
        onSubmit={handleSubmit}
        query={query}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default DeleteAlbumContainer;
