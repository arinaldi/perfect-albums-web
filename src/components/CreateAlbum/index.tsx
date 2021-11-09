import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import api from '../../utils/api';
import { AlbumInput } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from './presenter';

export default function CreateAlbumContainer() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { control, handleSubmit, register } = useForm<AlbumInput>({
    defaultValues: {
      artist: '',
      title: '',
      year: new Date().getFullYear().toString(),
      cd: false,
      aotd: false,
      favorite: false,
      studio: false,
    },
  });
  const { mutate } = useAdminState();
  useTitle('Create Album');

  async function submitFn(album: AlbumInput) {
    await api('/api/albums', { body: album, method: METHODS.POST });
  }

  const options = {
    callbacks: [() => navigate(`/admin${search}`)],
    handleSubmit,
    mutate,
    submitFn,
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={false} />
      <CreateEditAlbum
        control={control}
        header="Create"
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        register={register}
      />
    </ErrorBoundary>
  );
}
