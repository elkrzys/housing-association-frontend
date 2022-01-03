import {
  Flex,
  Box,
  Stack,
  Text,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { BasicInput, PasswordInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';

const ResetPasswordForm = () => {
  const { resetPassword } = useContext(AuthContext);
  const toast = useToast();

  const setSubmit = async (values, actions) => {
    if (
      await resetPassword(values.email, values.phoneNumber, values.password)
    ) {
      actions.resetForm({
        values: {
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        },
      });
      ToastSuccess(toast, 'Hasło zresetowane pomyślnie');
    } else {
      ToastError(toast, 'Hasło nie zostało zresetowane');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex align={'start'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} px={6}>
              {/* <Stack align={'center'}>
                        <Heading fontSize={'2xl'}>Zresetuj hasło</Heading>
                    </Stack> */}
              <Box
                rounded={'lg'}
                bg="white"
                // boxShadow={'lg'}
                w={'md'}
                px={8}>
                <Stack spacing={4}>
                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={props.values.email}
                    type="email"
                    isRequired
                  />

                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={props.values.phoneNumber}
                    type="tel"
                    isRequired
                  />

                  <PasswordInput
                    id="password"
                    name="password"
                    label="Nowe hasło"
                    defaultValue={props.values.password}
                    isRequired
                  />

                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Potwierdź hasło"
                    defaultValue={props.values.confirmPassword}
                    isRequired
                  />

                  <Stack spacing={10}>
                    <Button
                      bg={'green.300'}
                      color={'white'}
                      _hover={{
                        bg: 'green.400',
                      }}
                      type={'submit'}
                      isLoading={props.isSubmitting}>
                      Zresetuj
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default ResetPasswordForm;
