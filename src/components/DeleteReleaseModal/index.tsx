import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useGqlMutation from '../../hooks/useGqlMutation';
import useSubmit from '../../hooks/useSubmit';
import { DELETE_RELEASE } from '../../mutations';
import { Release } from '../../utils/types';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteReleaseContainer({
  data: release,
  isOpen,
  onClose,
}: Props) {
  const deleteRelease = useGqlMutation(DELETE_RELEASE);

  const options = {
    callbacks: [onClose],
    submitFn: async () => await deleteRelease({ id: release.id }),
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <DeleteDataModal
      data={release}
      dataType={MODAL_DATA_TYPES.RELEASE}
      isDeleting={isSubmitting}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={onSubmit}
    />
  );
}
