import { FC } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import useAdminState from '../../hooks/useAdminState';

const Pagination: FC = () => {
  const { handlers, isFirstPage, isLastPage, page } = useAdminState();
  const { onFirst, onLast, onNext, onPrevious } = handlers;

  return (
    <ButtonGroup
      aria-label="Change page"
      isAttached
      size="sm"
      variant="outline"
    >
      <Button isDisabled={isFirstPage} onClick={onFirst}>
        <ArrowBackIcon />
      </Button>
      <Button isDisabled={isFirstPage} onClick={onPrevious}>
        <ChevronLeftIcon />
      </Button>
      <Button isDisabled>{page}</Button>
      <Button isDisabled={isLastPage} onClick={onNext}>
        <ChevronRightIcon />
      </Button>
      <Button isDisabled={isLastPage} onClick={onLast}>
        <ArrowForwardIcon />
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
