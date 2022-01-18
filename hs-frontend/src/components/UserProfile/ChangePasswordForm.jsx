import { useContext } from 'react';
import { Flex, Box, Stack, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import UsersService from '../../services/UsersService';
import { AuthContext } from '../../contexts';
import { PasswordInput } from '../Inputs';
import { ToastError, ToastSuccess, ToastWarning } from '../Toasts';

const ChangePasswordForm = () => {
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const checkPasswords = (password1, password2) => {
    if (password1 !== password2) {
      ToastWarning(toast, 'Nowe hasło musi się zgadzać z potwierdzonym');
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
      actions.resetForm({
        values: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      });
      ToastSuccess(toast, 'Hasło zmienione pomyślnie');
    } else {
      ToastError(toast, 'Hasło nie zostało zmienione');
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
      {({ values, isSubmitting }) => (
        <Form>
          <Flex align="start" justify="center">
            <Stack spacing="8" mx="auto" px="6">
              <Box rounded="lg" bg="white" w="md" px="8">
                <Stack spacing="4">
                  <PasswordInput
                    id="oldPassword"
                    name="oldPassword"
                    label="Stare hasło"
                    defaultValue={values.oldPassword}
                    isRequired
                  />

                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    label="Nowe hasło"
                    defaultValue={values.newPassword}
                    isRequired
                  />

                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Potwierdź hasło"
                    defaultValue={values.confirmPassword}
                    isRequired
                  />

                  <Stack spacing="10">
                    <Button
                      bg="green.300"
                      color="white"
                      _hover={{
                        bg: 'green.400',
                      }}
                      type="submit"
                      isLoading={isSubmitting}>
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
