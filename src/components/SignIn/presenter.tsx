import { FC, FormEvent, useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { SignInInput } from '../../utils/types';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  isSubmitting: boolean;
  register: UseFormRegister<SignInInput>;
  onSubmit: (event: FormEvent) => void;
}

const SignIn: FC<Props> = ({ isSubmitting, onSubmit, register }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Flex align="center" marginBottom={3}>
        <Heading as="h3" size="lg">
          Sign In
        </Heading>
      </Flex>
      <Box maxWidth={{ base: '100%', md: '400px' }} margin="0 auto">
        <form onSubmit={onSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              autoCapitalize="off"
              autoComplete="email"
              isRequired
              type="email"
              {...register('email', { required: true })}
            />
          </FormControl>
          <FormControl id="password" isRequired my={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                autoCapitalize="off"
                autoComplete="current-password"
                isRequired
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Show or hide password"
                  icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  onClick={() => setShowPassword((show) => !show)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <SubmitButton
            isSubmitting={isSubmitting}
            loadingText="Submitting"
            text="Submit"
          />
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
