import { useLocation, useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../../constants';
import useAdminState from '../../hooks/useAdminState';
import AdminTable from '../AdminTable/presenter';
import AppMessage from '../AppMessage/presenter';
import ProgressLoader from '../ProgressLoader/presenter';
import Pagination from './Pagination';
import PerPageSelector from './PerPageSelector';
import StudioFilter from './StudioFilter';

export default function Admin() {
  const {
    albums,
    artistSearch,
    artistSearchRef,
    cdTotal,
    direction,
    handlers,
    isLoading,
    sort,
    titleSearch,
    titleSearchRef,
    total,
  } = useAdminState();
  const { onArtistChange, onClear, onSort, onTitleChange } = handlers;
  const navigate = useNavigate();
  const { search } = useLocation();

  const Content =
    albums?.length === 0 && !isLoading ? (
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
                {isLoading ? '—' : total?.toLocaleString()}
              </Badge>
            </Heading>
          </Flex>
          <Flex align="center">
            <Code marginLeft={2}>{import.meta.env.PACKAGE_VERSION}</Code>
            <Heading as="h5" marginLeft={3} marginRight={1} size="md">
              <Badge
                borderRadius="4px"
                data-testid="cdTotal"
                fontSize="0.9em"
                verticalAlign="baseline"
              >
                {cdTotal ? cdTotal.toLocaleString() : 0}
              </Badge>
            </Heading>
            CDs
          </Flex>
        </Flex>
        <Box
          align="center"
          display={{ base: 'block', sm: 'flex' }}
          justify="space-between"
          marginBottom={4}
        >
          <Input
            marginBottom={{ base: 2, sm: 0 }}
            marginRight={{ base: 0, sm: 3 }}
            name="artist"
            onChange={onArtistChange}
            placeholder="Search artist"
            ref={artistSearchRef}
            type="text"
            value={artistSearch}
          />
          <Input
            marginBottom={{ base: 2, sm: 0 }}
            marginRight={{ base: 0, sm: 3 }}
            name="title"
            onChange={onTitleChange}
            placeholder="Search title"
            ref={titleSearchRef}
            type="text"
            value={titleSearch}
          />
          <Flex alignItems="center" justifyContent="space-between">
            <Flex>
              <Button marginRight={1} onClick={onClear} variant="outline">
                Clear
              </Button>
              <Button
                onClick={() => navigate(`/admin/new${search}`)}
                variant="outline"
              >
                New
              </Button>
            </Flex>
            <Box display={{ base: 'block', sm: 'none' }}>
              <StudioFilter />
            </Box>
          </Flex>
        </Box>
        <Flex align="center" justify="center" marginBottom={4}>
          <Pagination />
          <Box marginX={2} />
          <PerPageSelector />
          <Box display={{ base: 'none', sm: 'block' }} marginX={2} />
          <Box display={{ base: 'none', sm: 'block' }}>
            <StudioFilter />
          </Box>
        </Flex>
        {Content}
      </Container>
    </>
  );
}
