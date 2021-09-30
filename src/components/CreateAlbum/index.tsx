import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MESSAGES, METHODS } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import useForm from '../../hooks/useForm';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import api from '../../utils/api';
import { AlbumInput } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from './presenter';

const CreateAlbumContainer: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { handleChange, values } = useForm<AlbumInput>({
    artist: '',
    title: '',
    year: new Date().getFullYear().toString(),
    cd: false,
    aotd: false,
    favorite: false,
    studio: false,
  });
  const { mutate } = useAdminState();
  useTitle('Create Album');

  function handleNavigate() {
    navigate(`/admin${search}`);
  }

  async function submitFn() {
    await api('/api/albums', { body: values, method: METHODS.POST });
  }

  const options = {
    callbacks: [handleNavigate],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={false} />
      <CreateEditAlbum
        data={values}
        isSaving={isSaving}
        header="Create"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </ErrorBoundary>
  );
};

export default CreateAlbumContainer;
