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

export default function DeleteAlbumContainer() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const [{ data, status }] = useStateMachine(`/api/albums/${id}`);
  const { mutate } = useAdminState();
  useTitle('Delete Album');

  async function submitFn() {
    await api(`/api/albums/${id}`, { method: METHODS.DELETE });
  }

  const options = {
    callbacks: [() => navigate(`/admin${search}`)],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <DeleteAlbum
        data={data}
        isDeleting={isSubmitting}
        onSubmit={onSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
}
