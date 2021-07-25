import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Code,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import { ALERT_TYPES, MESSAGES, PER_PAGE } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import AdminTable from '../AdminTable/presenter';
import AppMessage from '../AppMessage/presenter';
import ProgressLoader from '../ProgressLoader/presenter';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

const Admin: FC = () => {
  const {
    albums,
    cdTotal,
    direction,
    handlers,
    isFirstPage,
    isLastPage,
    isLoading,
    page,
    perPage,
    searchInput,
    searchText,
    sort,
    total,
  } = useAdminState();
  const {
    onClear,
    onFirst,
    onLast,
    onNext,
    onPerPageChange,
    onPrevious,
    onSearchChange,
    onSort,
  } = handlers;
  const history = useHistory();
  const { search } = useLocation();

  const handleNavigate = () => {
    history.push(`/admin/new${search}`);
  };

  const PerPageSelector = (
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

  const Pagination = (
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

  const Content =
    albums.length === 0 && !isLoading ? (
      <AppMessage type={ALERT_TYPES.INFO} message={MESSAGES.NO_DATA} />
    ) : (
      <AdminTable
        data={albums}
        direction={direction}
        isLoading={isLoading}
        onSort={onSort}
        sort={sort}
      />
    );

  return (
    <>
      <ProgressLoader isVisible={false} />
      <Container maxWidth="container.xl" marginBottom={6}>
        <Flex align="center" justify="space-between" marginBottom={3}>
          <Flex align="center">
            <Heading as="h3" size="lg">
              Admin
            </Heading>
            <Heading as="h3" marginLeft={3} size="lg">
              <Badge
                borderRadius="4px"
                data-testid="total"
                fontSize="0.9em"
                verticalAlign="baseline"
              >
                {isLoading ? '—' : total.toLocaleString()}
              </Badge>
            </Heading>
          </Flex>
          <Flex align="center">
            <Code marginLeft={2}>{process.env.npm_package_version}</Code>
            <Heading as="h5" marginLeft={3} marginRight={1} size="md">
              <Badge
                borderRadius="4px"
                data-testid="cdTotal"
                fontSize="0.9em"
                verticalAlign="baseline"
              >
                {cdTotal.toLocaleString()}
              </Badge>
            </Heading>
            CDs
          </Flex>
        </Flex>
        <Flex align="center" justify="space-between" marginBottom={4}>
          <Input
            marginRight={3}
            name="username"
            onChange={onSearchChange}
            placeholder="Search"
            ref={searchInput}
            type="text"
            value={searchText}
          />
          <Flex>
            <Button marginRight={1} onClick={onClear} variant="outline">
              Clear
            </Button>
            <Button onClick={handleNavigate} variant="outline">
              New
            </Button>
          </Flex>
        </Flex>
        <Flex align="center" justify="center" marginBottom={4}>
          {Pagination}
          <Box marginX={2} />
          {PerPageSelector}
        </Flex>
        {Content}
      </Container>
    </>
  );
};

export default Admin;
