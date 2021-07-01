import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

const CreateEditAlbum = (props) => {
  const {
    data,
    isLoading,
    isSaving,
    query,
    header,
    onChange,
    onRadioChange,
    onSubmit,
    status,
  } = props;
  const history = useHistory();

  return (
    <Container maxWidth='container.lg' marginBottom={6}>
      <Heading as='h3' size='lg' marginBottom={3}>
        {header} Album
      </Heading>
      {!isLoading && (
        <form onSubmit={onSubmit}>
          <Flex flexDirection={{ base: 'column', md: 'row' }} justify='space-between'>
            <Box flex={1} marginRight={6}>
              <FormControl id='artist' isRequired>
                <FormLabel>Artist</FormLabel>
                <Input
                  isRequired
                  name='artist'
                  onChange={onChange}
                  type='text'
                  value={data.artist}
                />
              </FormControl>
              <FormControl id='title' isRequired marginY={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  isRequired
                  name='title'
                  onChange={onChange}
                  type='text'
                  value={data.title}
                />
              </FormControl>
              <FormControl id='year' isRequired>
                <FormLabel>Year</FormLabel>
                <Input
                  isRequired
                  name='year'
                  onChange={onChange}
                  type='text'
                  value={data.year}
                />
              </FormControl>
            </Box>
            <Box marginTop={{ base: 6, md: 0 }}>
              <RadioGroup name='cd' value={data.cd}>
                <Text>CD</Text>
                <Stack direction='row' spacing={4}>
                  <Radio
                    marginBottom={0}
                    onChange={onRadioChange}
                    value={false}
                  >
                    false
                  </Radio>
                  <Radio
                    onChange={onRadioChange}
                    value
                  >
                    true
                  </Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup marginY={{ base: 7, md: 14 }} name='aotd' value={data.aotd}>
                <Text>AotD</Text>
                <Stack direction='row' spacing={4}>
                  <Radio
                    marginBottom={0}
                    onChange={onRadioChange}
                    value={false}
                  >
                    false
                  </Radio>
                  <Radio
                    onChange={onRadioChange}
                    value
                  >
                    true
                  </Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup name='favorite' value={data.favorite}>
                <Text>Favorite</Text>
                <Stack direction='row' spacing={4}>
                  <Radio
                    marginBottom={0}
                    onChange={onRadioChange}
                    value={false}
                  >
                    false
                  </Radio>
                  <Radio
                    onChange={onRadioChange}
                    value
                  >
                    true
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
          <Box marginTop={{ base: 8, md: 4 }} marginBottom={6}>
            <Button
              onClick={() => history.push(`/admin?${query}`)}
              marginRight={1}
              variant='outline'
            >
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isSaving}
              isLoading={isSaving}
              loadingText='Saving'
              text='Save'
            />
          </Box>
        </form>
      )}
      {status === STATE_STATUSES.FAILURE ? <AppMessage /> : null}
    </Container>
  );
};

CreateEditAlbum.propTypes = {
  data: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    cd: PropTypes.bool.isRequired,
    aotd: PropTypes.bool.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  isSaving: PropTypes.bool,
  query: PropTypes.string,
  header: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

CreateEditAlbum.defaultProps = {
  isValidated: false,
  isLoading: false,
  isSaving: false,
  query: '',
};

export default CreateEditAlbum;
