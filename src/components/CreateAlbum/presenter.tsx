import { ChangeEvent, FC, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

import { AlbumBase } from '../../utils/types';
import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  data: AlbumBase;
  header: string;
  isLoading?: boolean;
  isSaving?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
  status: string;
}

const CreateEditAlbum: FC<Props> = (props) => {
  const {
    data,
    header,
    isLoading = false,
    isSaving = false,
    onChange,
    onRadioChange,
    onSubmit,
    status,
  } = props;
  const history = useHistory();
  const { search } = useLocation();

  function handleCancel() {
    history.push(`/admin${search}`);
  }

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Heading as="h3" size="lg" marginBottom={3}>
        {header} Album
      </Heading>
      {!isLoading && (
        <form onSubmit={onSubmit}>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justify="space-between"
          >
            <Box flex={1} marginRight={6}>
              <FormControl id="artist" isRequired>
                <FormLabel>Artist</FormLabel>
                <Input
                  isRequired
                  name="artist"
                  onChange={onChange}
                  type="text"
                  value={data.artist}
                />
              </FormControl>
              <FormControl id="title" isRequired marginY={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  isRequired
                  name="title"
                  onChange={onChange}
                  type="text"
                  value={data.title}
                />
              </FormControl>
              <FormControl id="year" isRequired>
                <FormLabel>Year</FormLabel>
                <Input
                  isRequired
                  name="year"
                  onChange={onChange}
                  type="text"
                  value={data.year}
                />
              </FormControl>
            </Box>
            <Box marginTop={{ base: 6, md: 0 }}>
              <RadioGroup name="cd" value={data.cd.toString()}>
                <Text>CD</Text>
                <Stack direction="row" spacing={4}>
                  <Radio
                    marginBottom={0}
                    onChange={onRadioChange}
                    value="false"
                  >
                    false
                  </Radio>
                  <Radio onChange={onRadioChange} value="true">
                    true
                  </Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup
                marginY={{ base: 7, md: 14 }}
                name="aotd"
                value={data.aotd.toString()}
              >
                <Text>AotD</Text>
                <Stack direction="row" spacing={4}>
                  <Radio
                    marginBottom={0}
                    onChange={onRadioChange}
                    value="false"
                  >
                    false
                  </Radio>
                  <Radio onChange={onRadioChange} value="true">
                    true
                  </Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup name="favorite" value={data.favorite.toString()}>
                <Text>Favorite</Text>
                <Stack direction="row" spacing={4}>
                  <Radio
                    marginBottom={0}
                    onChange={onRadioChange}
                    value="false"
                  >
                    false
                  </Radio>
                  <Radio onChange={onRadioChange} value="true">
                    true
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
          <Box marginTop={{ base: 8, md: 4 }} marginBottom={6}>
            <Button marginRight={2} onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isSaving}
              isLoading={isSaving}
              loadingText="Saving"
              text="Save"
            />
          </Box>
        </form>
      )}
      {status === STATE_STATUSES.FAILURE ? <AppMessage /> : null}
    </Container>
  );
};

export default CreateEditAlbum;
