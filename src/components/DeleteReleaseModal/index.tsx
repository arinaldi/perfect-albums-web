import { FC } from 'react';
import { gql, useMutation } from '@apollo/client';

import { ModalDataType, Release } from '../../utils/types';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { DELETE_RELEASE } from '../../mutations';
import { MESSAGES } from '../../constants';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteReleaseContainer: FC<Props> = ({ data, isOpen, onClose }) => {
  const [deleteRelease] = useMutation(DELETE_RELEASE, {
    refetchQueries: [{ query: GET_RELEASES }],
    update(cache, { data: { deleteRelease } }) {
      cache.modify({
        fields: {
          songs(existingReleases = []) {
            cache.writeFragment({
              data: deleteRelease,
              fragment: gql`
                fragment DeleteRelease on Release {
                  id
                }
              `,
            });
            return existingReleases.filter(
              (release: Release) => release.id !== deleteRelease.id,
            );
          },
        },
      });
    },
  });

  const submitFunc = async () => {
    await deleteRelease({
      variables: { id: data.id },
    });
  };

  const options = {
    callback: onClose,
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <DeleteDataModal
      data={data}
      dataType={ModalDataType.release}
      isDeleting={isSaving}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteReleaseContainer;
