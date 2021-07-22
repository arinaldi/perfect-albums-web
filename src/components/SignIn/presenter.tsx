import { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import SubmitButton from '../SubmitButton/presenter';
import AppMessage from '../AppMessage/presenter';

interface Props {
  error: string;
  isSubmitting: boolean;
  onError: (error: string) => void;
  onSubmit: (event: FormEvent) => void;
}

const SignIn: FC<Props> = (props) => {
  const { error, isSubmitting, onError, onSubmit } = props;
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (error) onError('');

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Flex align="center" marginBottom={3}>
        <Heading as="h3" size="lg">
          Sign In
        </Heading>
      </Flex>
      <Box maxWidth={{ base: '100%', md: '400px' }} margin="0 auto">
        <form onSubmit={onSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              autoCapitalize="off"
              autoComplete="username"
              isRequired
              name="username"
              onChange={handleChange}
              type="text"
              value={credentials.username}
            />
          </FormControl>
          <FormControl id="password" isRequired my={4}>
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete="current-password"
              isRequired
              name="password"
              onChange={handleChange}
              type="password"
              value={credentials.password}
            />
          </FormControl>
          <SubmitButton
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Submitting"
            text="Submit"
          />
        </form>
        <Box mt={4}>{error ? <AppMessage message={error} /> : null}</Box>
      </Box>
    </Container>
  );
};

export default SignIn;
