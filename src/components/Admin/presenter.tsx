import { ChangeEvent, FC, RefObject, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

import { Album } from '../../utils/types';
import { ALERT_TYPES, MESSAGES, PER_PAGE, SORT_DIRECTION } from '../../constants';
import AdminTable from '../AdminTable/presenter';
import AppMessage from '../AppMessage/presenter';

interface Props {
  data: Album[];
  clearInput: () => void;
  currentPage: number;
  direction: SORT_DIRECTION;
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (value: number) => void;
  onSort: (value: string) => void;
  perPage: number;
  searchInput: RefObject<HTMLInputElement>;
  searchText: string;
  sort: string;
  total: number;
}

const Admin: FC<Props> = (props) => {
  const {
    clearInput,
    currentPage,
    data,
    direction,
    isLoading,
    onChange,
    onFirst,
    onLast,
    onNext,
    onPrev,
    onPageChange,
    onSort,
    perPage,
    searchInput,
    searchText,
    sort,
    total,
  } = props;
  const history = useHistory();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  useEffect(() => {
    if (searchInput && searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  const handleNavigate = () => {
    history.push(`/admin/new?${searchText}`);
  };

  const PerPageSelector = (
    <ButtonGroup
      aria-label="Change per page"
      isAttached
      size="sm"
      variant="outline"
    >
      {PER_PAGE.map((page, index) => (
        <Button
          key={index}
          isDisabled={page === perPage}
          onClick={() => onPageChange(page)}
          variant="outline"
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  );

  const Pagination = (
    <ButtonGroup
      aria-label="Change page"
      isAttached
      size="sm"
      variant="outline"
    >
      <Button
        isDisabled={isFirstPage}
        onClick={onFirst}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        isDisabled={isFirstPage}
        onClick={onPrev}
      >
        <ChevronLeftIcon />
      </Button>
      <Button isDisabled>
        {currentPage}
      </Button>
      <Button
        isDisabled={isLastPage}
        onClick={onNext}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        isDisabled={isLastPage}
        onClick={onLast}
      >
        <ArrowForwardIcon />
      </Button>
    </ButtonGroup>
  );

  const Content = () => {
    if (isLoading) return null;

    return data.length
      ? (
        <AdminTable
          data={data}
          direction={direction}
          onSort={onSort}
          searchText={searchText}
          sort={sort}
        />
      )
      : (
        <AppMessage
          type={ALERT_TYPES.INFO}
          message={MESSAGES.NO_DATA}
        />
      );
  };

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Flex align="center" justify="space-between" marginBottom={3}>
        <Heading as="h3" size="lg">Admin</Heading>
        <Code>{process.env.npm_package_version}</Code>
        <Heading as="h3" size="lg">
          <Badge
            borderRadius="4px"
            data-testid="total"
            fontSize="0.9em"
            verticalAlign="baseline"
          >
            {total.toLocaleString()}
          </Badge>
        </Heading>
      </Flex>
      <Flex align="center" justify="space-between" marginBottom={3}>
        <Input
          marginRight={3}
          name="username"
          onChange={onChange}
          placeholder="Search"
          ref={searchInput}
          type="text"
          value={searchText}
        />
        <Flex>
          <Button
            marginRight={1}
            onClick={clearInput}
            variant="outline"
          >
            Clear
          </Button>
          <Button
            onClick={handleNavigate}
            variant="outline"
          >
            New
          </Button>
        </Flex>
      </Flex>
      <Flex align="center" justify="center" marginBottom={3}>
        {Pagination}
        <Box mx={2} />
        {PerPageSelector}
      </Flex>
      <Content />
    </Container>
  );
};

export default Admin;
