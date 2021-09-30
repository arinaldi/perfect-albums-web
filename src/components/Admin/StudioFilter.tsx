import { FC } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

import useAdminState from '../../hooks/useAdminState';

const StudioFilter: FC = () => {
  const { handlers, studio } = useAdminState();
  const { onFilter } = handlers;

  return (
    <ButtonGroup
      aria-label="Toggle studio album filter"
      isAttached
      size="sm"
      variant="outline"
    >
      <Button isDisabled={studio === ''} onClick={onFilter} variant="outline">
        Off
      </Button>
      <Button
        isDisabled={studio === 'true'}
        onClick={onFilter}
        variant="outline"
      >
        On
      </Button>
    </ButtonGroup>
  );
};

export default StudioFilter;
