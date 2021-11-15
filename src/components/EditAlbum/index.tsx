import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS, STATE_STATUSES } from '../../constants';
import useApiMutation from '../../hooks/useApiMutation';
import useStateMachine from '../../hooks/useStateMachine';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import { AlbumInput } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateEditAlbum from '../CreateAlbum/presenter';

export default function EditAlbumContainer() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const [{ data, status }] = useStateMachine(`/api/albums/${id}`);
  const { control, handleSubmit, register, setValue } = useForm<AlbumInput>();
  const isLoading = status === STATE_STATUSES.LOADING;
  const editAlbum = useApiMutation(`/api/albums/${id}`);
  useTitle('Edit Album');

  useEffect(() => {
    if (data) {
      setValue('artist', data.artist);
      setValue('title', data.title);
      setValue('year', data.year);
      setValue('cd', data.cd);
      setValue('aotd', data.aotd);
      setValue('favorite', data.favorite);
      setValue('studio', data.studio);
    }
  }, [data, setValue]);

  const options = {
    callbacks: [() => navigate(`/admin${search}`)],
    handleSubmit,
    submitFn: async (album: AlbumInput) =>
      await editAlbum({ body: album, method: METHODS.PUT }),
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <CreateEditAlbum
        control={control}
        header="Edit"
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        register={register}
        status={status}
      />
    </ErrorBoundary>
  );
}
