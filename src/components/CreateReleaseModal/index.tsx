import { ChangeEvent, FC, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Release } from '../../utils/types';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { CREATE_RELEASE } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import CreateReleaseModal from './presenter';

interface CacheResponse {
  releases: Release[];
}

const CreateReleaseContainer: FC = () => {
  const [state, dispatch] = useApp();
  const { isOpen } = state.modal;
  const [createRelease] = useMutation(
    CREATE_RELEASE,
    {
      update (cache, { data: { createRelease } }) {
        const response = cache.readQuery<CacheResponse>({ query: GET_RELEASES });

        if (response?.releases) {
          cache.writeQuery({
            query: GET_RELEASES,
            data: { releases: [...response.releases, createRelease] },
          });
        }
      },
    },
  );
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;

    setRelease({
      ...release,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
    setRelease({
      artist: '',
      title: '',
      date: '',
    });
  };

  const submitFunc = async () => {
    await createRelease({
      variables: release,
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <CreateReleaseModal
      isOpen={isOpen}
      header="Create"
      release={release}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateReleaseContainer;
