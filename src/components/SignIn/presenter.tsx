import { ChangeEvent, FC, FormEvent } from 'react';
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
  error?: string;
  isSubmitting?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
  password: string;
  username: string;
}

const SignIn: FC<Props> = (props) => {
  const {
    error = '',
    isSubmitting = false,
    onChange,
    onSubmit,
    password,
    username,
  } = props;

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
              onChange={onChange}
              type="text"
              value={username}
            />
          </FormControl>
          <FormControl id="password" isRequired my={4}>
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete="current-password"
              isRequired
              name="password"
              onChange={onChange}
              type="password"
              value={password}
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
