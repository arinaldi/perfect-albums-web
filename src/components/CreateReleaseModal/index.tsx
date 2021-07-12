import { ChangeEvent, FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { CREATE_RELEASE } from '../../mutations';
import { MESSAGES } from '../../constants';
import CreateReleaseModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateReleaseContainer: FC<Props> = ({ isOpen, onClose }) => {
  const [createRelease] = useMutation(CREATE_RELEASE, {
    refetchQueries: [{ query: GET_RELEASES }],
    update(cache, { data: { createRelease } }) {
      cache.modify({
        fields: {
          songs(existingReleases = []) {
            const newReleaseRef = cache.writeFragment({
              data: createRelease,
              fragment: gql`
                fragment NewRelease on Release {
                  id
                  artist
                  title
                  date
                }
              `,
            });
            return [...existingReleases, newReleaseRef];
          },
        },
      });
    },
  });
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    setRelease({
      ...release,
      [name]: value,
    });
  };

  const handleClose = () => {
    onClose();
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
      header="Create"
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      release={release}
    />
  );
};

export default CreateReleaseContainer;
