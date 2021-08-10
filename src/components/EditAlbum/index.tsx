import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { MESSAGES, METHODS, STATE_STATUSES } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import useForm from '../../hooks/useForm';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import api from '../../utils/api';
import { AlbumInput } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from '../CreateAlbum/presenter';

const EditAlbumContainer: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const [{ data, status }] = useStateMachine(`/api/albums/${id}`);
  const { values, handleChange } = useForm<AlbumInput>({
    aotd: data?.aotd || false,
    artist: data?.artist || '',
    cd: data?.cd || false,
    favorite: data?.favorite || false,
    title: data?.title || '',
    year: data?.year || '',
  });
  const isLoading = status === STATE_STATUSES.LOADING;
  const { mutate } = useAdminState();
  useTitle('Edit Album');

  function handleNavigate() {
    navigate(`/admin${search}`);
  }

  async function submitFn() {
    await api(`/api/albums/${id}`, { body: values, method: METHODS.PUT });
  }

  const options = {
    callbacks: [handleNavigate],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <CreateEditAlbum
        data={values}
        isLoading={isLoading}
        isSaving={isSaving}
        header="Edit"
        onChange={handleChange}
        onSubmit={handleSubmit}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default EditAlbumContainer;
