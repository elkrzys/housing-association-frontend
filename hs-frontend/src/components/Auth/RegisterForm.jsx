import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { BasicInput, PasswordInput } from '../Inputs';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastError, ToastSuccess } from '../Toasts';
import { ValidationSchemas } from '../ValidationSchemas';

const RegisterForm = () => {
  const { signUp } = useContext(AuthContext);
  const toast = useToast();
  const errorBox = error => <Box color="red.500">{error}</Box>;

  const setSubmit = async (values, actions) => {
    if (
      await signUp(
        values.firstName,
        values.lastName,
        values.phoneNumber,
        values.email,
        values.password,
      )
    ) {
      actions.resetForm();
      ToastSuccess(toast, 'Pomyślnie zarejestrowano');
    } else {
      ToastError(toast, 'Użytkownik już istnieje');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={ValidationSchemas.signUpSchema}
      onSubmit={setSubmit}>
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <Flex align="start" justify="center">
            <Stack w="100%" spacing={8} mx="auto" py={6} px={6}>
              <Stack align="center">
                <Heading fontSize="2xl">Utwórz konto</Heading>
              </Stack>
              <Box rounded="lg" bg="white" boxShadow="lg" py={6} px={8}>
                <Stack spacing={4}>
                  <HStack spacing={2}>
                    <BasicInput
                      id="firstName"
                      name="firstName"
                      label="Imię"
                      defaultValue={values.firstName}
                      type="text"
                      isRequired
                    />

                    <BasicInput
                      id="lastName"
                      name="lastName"
                      label="Nazwisko"
                      defaultValue={values.lastName}
                      type="text"
                      isRequired
                    />
                  </HStack>
                  {errors.firstName && touched.firstName
                    ? errorBox(errors.firstName)
                    : null}
                  {errors.lastName && touched.lastName
                    ? errorBox(errors.lastName)
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
                    ? errorBox(errors.phoneNumber)
                    : null}

                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={values.email}
                    type="email"
                    isRequired
                  />
                  {errors.email && touched.email
                    ? errorBox(errors.email)
                    : null}

                  <PasswordInput
                    id="password"
                    name="password"
                    label="Hasło"
                    defaultValue={values.password}
                    isRequired
                  />
                  {errors.password && touched.password
                    ? errorBox(errors.password)
                    : null}

                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Potwierdź hasło"
                    defaultValue={values.confirmPassword}
                    isRequired
                  />
                  {errors.confirmPassword && touched.confirmPassword
                    ? errorBox(errors.confirmPassword)
                    : null}

                  <Stack pt={4}>
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{ bg: 'blue.500' }}
                      type="submit"
                      isLoading={isSubmitting}>
                      Zarejestruj
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
export default RegisterForm;
