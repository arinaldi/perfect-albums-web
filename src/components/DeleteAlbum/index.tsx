import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { MESSAGES, METHODS, STATE_STATUSES } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import api from '../../utils/api';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import DeleteAlbum from './presenter';

const DeleteAlbumContainer: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const [state] = useStateMachine(`/api/albums/${id}`);
  const { data, status } = state;
  const { mutate } = useAdminState();
  useTitle('Delete Album');

  function handleNavigate() {
    navigate(`/admin${search}`);
  }

  async function submitFn() {
    await api(`/api/albums/${id}`, { method: METHODS.DELETE });
  }

  const options = {
    callbacks: [handleNavigate],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <DeleteAlbum
        data={data}
        isDeleting={isSaving}
        onSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default DeleteAlbumContainer;
