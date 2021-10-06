import { FC, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import { AlbumInput } from '../../utils/types';
import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  control: Control<any>;
  header: string;
  isLoading?: boolean;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent) => void;
  register: UseFormRegister<AlbumInput>;
  status?: STATE_STATUSES;
}

const CreateEditAlbum: FC<Props> = (props) => {
  const {
    control,
    header,
    isLoading = false,
    isSubmitting,
    onSubmit,
    register,
    status,
  } = props;
  const navigate = useNavigate();
  const { search } = useLocation();
  const { ref: artistRef, ...artistRest } = register('artist', {
    required: true,
  });
  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
  });
  const { ref: yearRef, ...yearRest } = register('year', { required: true });

  function handleCancel() {
    navigate(`/admin${search}`);
  }

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Heading as="h3" size="lg" marginBottom={3}>
        {header} Album
      </Heading>
      {isLoading ? null : (
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
                  ref={(e) => artistRef(e)}
                  type="text"
                  {...artistRest}
                />
              </FormControl>
              <FormControl id="title" isRequired marginY={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  isRequired
                  ref={(e) => titleRef(e)}
                  type="text"
                  {...titleRest}
                />
              </FormControl>
              <FormControl id="year" isRequired>
                <FormLabel>Year</FormLabel>
                <Input
                  isRequired
                  ref={(e) => yearRef(e)}
                  type="text"
                  {...yearRest}
                />
              </FormControl>
            </Box>
            <Flex
              marginTop={{ base: 6, md: 0 }}
              direction="column"
              justifyContent="space-around"
            >
              <Controller
                control={control}
                name="cd"
                render={({ field: { onChange, ref, value } }) => (
                  <Checkbox isChecked={value} onChange={onChange} ref={ref}>
                    CD
                  </Checkbox>
                )}
              />
              <Controller
                control={control}
                name="aotd"
                render={({ field: { onChange, ref, value } }) => (
                  <Checkbox isChecked={value} onChange={onChange} ref={ref}>
                    Album of the Day
                  </Checkbox>
                )}
              />
              <Controller
                control={control}
                name="favorite"
                render={({ field: { onChange, ref, value } }) => (
                  <Checkbox isChecked={value} onChange={onChange} ref={ref}>
                    Favorite
                  </Checkbox>
                )}
              />
              <Controller
                control={control}
                name="studio"
                render={({ field: { onChange, ref, value } }) => (
                  <Checkbox isChecked={value} onChange={onChange} ref={ref}>
                    Studio Album
                  </Checkbox>
                )}
              />
            </Flex>
          </Flex>
          <Box marginTop={{ base: 8, md: 4 }} marginBottom={6}>
            <Button marginRight={2} onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
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
