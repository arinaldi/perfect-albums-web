import { FC } from 'react';

import { MESSAGES } from '../../constants';
import useForm from '../../hooks/useForm';
import useNewReleases from '../../hooks/useNewReleases';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { EDIT_RELEASE } from '../../mutations';
import { formatDate } from '../../utils';
import { Release, ReleaseInput } from '../../utils/types';
import EditReleaseModal from '../CreateReleaseModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

const EditReleaseContainer: FC<Props> = ({ data, isOpen, onClose }) => {
  const { mutate } = useNewReleases();
  const { handleChange, resetForm, values } = useForm<ReleaseInput>({
    artist: data.artist,
    title: data.title,
    date: formatDate(data.date || ''),
  });

  function handleClose() {
    onClose();
    resetForm();
  }

  async function submitFn() {
    await graphQLClient.request(EDIT_RELEASE, {
      ...values,
      id: data.id,
    });
  }

  const options = {
    callbacks: [handleClose, mutate],
    submitFn,
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <EditReleaseModal
      header="Edit"
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      release={values}
    />
  );
};

export default EditReleaseContainer;
