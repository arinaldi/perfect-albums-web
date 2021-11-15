import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { MESSAGES, METHODS, STATE_STATUSES } from '../../constants';
import useApiMutation from '../../hooks/useApiMutation';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import DeleteAlbum from './presenter';

export default function DeleteAlbumContainer() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const [{ data, status }] = useStateMachine(`/api/albums/${id}`);
  const deleteAlbum = useApiMutation(`/api/albums/${id}`);
  useTitle('Delete Album');

  const options = {
    callbacks: [() => navigate(`/admin${search}`)],
    submitFn: async () => await deleteAlbum({ method: METHODS.DELETE }),
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
