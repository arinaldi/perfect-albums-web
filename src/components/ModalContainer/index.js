import React, { Fragment } from 'react';

import { MODAL_TYPES } from '../../constants';
import { useAppState } from '../Provider';
import CreateReleaseModal from '../CreateReleaseModal';
import EditReleaseModal from '../EditReleaseModal';
import DeleteReleaseModal from '../DeleteReleaseModal';
import CreateSongModal from '../CreateSongModal';
import DeleteSongModal from '../DeleteSongModal';

const ModalContainer = () => {
  const { modal } = useAppState();

  switch (modal.type) {
  case MODAL_TYPES.NEW_RELEASE_CREATE:
    return <CreateReleaseModal />;
  case MODAL_TYPES.NEW_RELEASE_EDIT:
    return <EditReleaseModal />;
  case MODAL_TYPES.NEW_RELEASE_DELETE:
    return <DeleteReleaseModal />;
  case MODAL_TYPES.FEATURED_SONGS_CREATE:
    return <CreateSongModal />;
  case MODAL_TYPES.FEATURED_SONGS_DELETE:
    return <DeleteSongModal />;
  default:
    return <Fragment />;
  }
};

export default ModalContainer;
