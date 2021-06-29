import React from 'react';
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import SubmitButton from '../SubmitButton/presenter';

const SignIn = (props) => {
  const {
    handleChange,
    handleSubmit,
    isSubmitting,
    password,
    username,
  } = props;

  return (
    <Container
      className='no-loader'
      maxWidth='container.lg'
      mb={6}
    >
      <Flex align='center' mb={3}>
        <Heading as='h3' size='lg'>
          Sign In
        </Heading>
      </Flex>
      <Box maxWidth={{ base: '100%', md: '400px' }} margin='0 auto'>
        <form onSubmit={handleSubmit}>
          <FormControl id='username'>
            <FormLabel>Username</FormLabel>
            <Input
              autoCapitalize='off'
              autoComplete='username'
              name='username'
              onChange={handleChange}
              type='text'
              value={username}
            />
          </FormControl>
          <FormControl id='password' my={4}>
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete='current-password'
              name='password'
              onChange={handleChange}
              type='password'
              value={password}
            />
          </FormControl>
          <SubmitButton
            isDisabled={!(username && password) || isSubmitting}
            isLoading={isSubmitting}
            text='Submit'
            loadingText='Submitting'
          />
        </form>
      </Box>
    </Container>
  );
};

SignIn.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

SignIn.defaultProps = {
  isSubmitting: false,
};

export default SignIn;
