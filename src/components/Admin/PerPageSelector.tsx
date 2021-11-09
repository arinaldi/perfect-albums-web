import { Button, ButtonGroup } from '@chakra-ui/react';

import { PER_PAGE } from '../../constants';
import useAdminState from '../../hooks/useAdminState';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPageSelector() {
  const { handlers, perPage } = useAdminState();
  const { onPerPageChange } = handlers;

  return (
    <ButtonGroup
      aria-label="Change per page"
      isAttached
      size="sm"
      variant="outline"
    >
      <Button
        isDisabled={perPage === SMALL}
        onClick={() => onPerPageChange(SMALL)}
        variant="outline"
      >
        {SMALL}
      </Button>
      <Button
        isDisabled={perPage === MEDIUM}
        onClick={() => onPerPageChange(MEDIUM)}
        variant="outline"
      >
        {MEDIUM}
      </Button>
      <Button
        isDisabled={perPage === LARGE}
        onClick={() => onPerPageChange(LARGE)}
        variant="outline"
      >
        {LARGE}
      </Button>
    </ButtonGroup>
  );
}
