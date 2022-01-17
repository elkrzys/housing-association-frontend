import { Flex, Box, Stack, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { BasicInput, PasswordInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import { Schemas, showErrorBox } from '../Validation';

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
      validateOnBlur
      initialValues={{
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Schemas.resetPasswordSchema}
      onSubmit={setSubmit}>
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <Flex align="start" justify="center">
            <Stack spacing="8" mx="auto" px="6">
              <Box rounded="lg" bg="white" w="md" px="8">
                <Stack spacing="4">
                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={values.email}
                    type="email"
                    isRequired
                  />
                  {errors.email && touched.email
                    ? showErrorBox(errors.email)
                    : null}

                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={values.phoneNumber}
                    type="tel"
                    isRequired
                  />
                  {errors.phoneNumber && touched.phoneNumber
                    ? showErrorBox(errors.phoneNumber)
                    : null}

                  <PasswordInput
                    id="password"
                    name="password"
                    label="Nowe hasło"
                    defaultValue={values.password}
                    isRequired
                  />
                  {errors.password && touched.password
                    ? showErrorBox(errors.password)
                    : null}

                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Potwierdź hasło"
                    defaultValue={values.confirmPassword}
                    isRequired
                  />
                  {errors.confirmPassword && touched.confirmPassword
                    ? showErrorBox(errors.confirmPassword)
                    : null}

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
export default ResetPasswordForm;
