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
import UsersService from '../../services/UsersService';
import { AuthContext } from '../../contexts';
import { useContext, useState } from 'react';
import { PasswordInput } from '../Inputs';

const ChangePasswordForm = () => {
  const flexBg = useColorModeValue('none', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const checkPasswords = (password1, password2) => {
    if (password1 !== password2) {
      toast({
        title: 'Nowe hasło musi się zgadzać z potwierdzonym',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  const setSubmit = async (values, actions) => {
    if (!checkPasswords(values.newPassword, values.confirmPassword)) return;
    let response = await UsersService.changePassword(
      user.id,
      values.oldPassword,
      values.newPassword,
    );
    if (response.status === 'SUCCESS') {
      console.log('change successful');
      actions.resetForm({
        values: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      });
      toast({
        title: 'Hasło zmienione pomyślnie',
        status: 'success',
        isClosable: true,
        duration: 2500,
      });
    } else {
      console.log('change failed');
      toast({
        title: 'Hasło nie zostało zmienione',
        status: 'error',
        isClosable: true,
        duration: 2500,
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
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
                rounded="lg"
                bg="white"
                // boxShadow={'lg'}
                w="md"
                px={8}>
                <Stack spacing={4}>
                  <PasswordInput
                    id="oldPassword"
                    name="oldPassword"
                    label="Stare hasło"
                    defaultValue={props.values.oldPassword}
                    isRequired
                  />

                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    label="Nowe hasło"
                    defaultValue={props.values.newPassword}
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
export default ChangePasswordForm;
