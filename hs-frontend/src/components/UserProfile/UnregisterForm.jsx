import {
  Flex,
  Box,
  Stack,
  HStack,
  Text,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import UsersService from '../../services/UsersService';
import { AuthContext } from '../../contexts';
import { useContext, useState } from 'react';
import { PasswordInput } from '../Inputs';
import { ToastError } from '../Toasts';

const UnregisterForm = ({ onClose, onUnregister }) => {
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const setSubmit = async (values, actions) => {
    const response = await UsersService.unregisterUser(
      user.id,
      values.password,
    );
    if (response.status === 'SUCCESS') {
      onClose();
      onUnregister();
    } else {
      ToastError(toast, 'Wystąpił problem podczas usuwania konta');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      onSubmit={setSubmit}>
      {({ values, isSubmitting }) => (
        <Form>
          <Flex align="start" justify="center">
            <Stack spacing={8} mx="auto" px={6}>
              <Box rounded="lg" bg="white" w="md" px={8}>
                <Stack align={'center'}>
                  <Heading fontSize={'xl'}>Potwierdź usuwanie hasłem</Heading>
                </Stack>
                <Stack spacing={4}>
                  <PasswordInput
                    id="password"
                    name="password"
                    label="Hasło"
                    defaultValue={values.password}
                    isRequired
                  />

                  <HStack justifyContent="end" spacing="2">
                    <Button
                      bg="red.300"
                      color="white"
                      _hover={{
                        bg: 'red.400',
                      }}
                      type="submit"
                      isLoading={isSubmitting}>
                      Usuń
                    </Button>
                    <Button
                      bg="gray.100"
                      _hover={{ bg: 'white' }}
                      onClick={onClose}>
                      Anuluj
                    </Button>
                  </HStack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default UnregisterForm;
