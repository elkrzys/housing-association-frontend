import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { BasicInput, PasswordInput } from '../Inputs';
import { ToastError } from '../Toasts';
import { Schemas, showErrorBox } from '../Validation';
import CustomModal from '../CustomModal';
import ResetPasswordForm from './ResetPasswordForm';

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // eslint-disable-next-line consistent-return
  const setSubmit = async (values, actions) => {
    if (await signIn(values.email, values.password)) {
      return <Redirect to="/home" />;
    }
    ToastError(toast, 'Błędne logowanie, spróbuj ponownie.');
    actions.setSubmitting(false);
  };

  return (
    <Formik
      validateOnBlur
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Schemas.signInSchema}
      onSubmit={setSubmit}>
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <Flex align="start" justify="center">
            <Stack w="100%" spacing="8" mx="auto" py="6" px="6">
              <Stack align="center">
                <Heading fontSize="2xl">Zaloguj się</Heading>
              </Stack>
              <Box rounded="lg" bg="white" boxShadow="lg" p="8">
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

                  <PasswordInput
                    id="password"
                    name="password"
                    label="Hasło"
                    defaultValue={values.password}
                    isRequired
                  />
                  {errors.password && touched.password
                    ? showErrorBox(errors.password)
                    : null}
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align="start"
                      justify="flex-end">
                      <Button
                        onClick={onOpen}
                        bg="transparent"
                        _hover={{ bg: 'transparent', color: 'blue.600' }}
                        color="blue.400">
                        Nie pamiętasz hasła?
                      </Button>
                      <CustomModal
                        isOpen={isOpen}
                        onClose={onClose}
                        header="Zresetuj hasło">
                        <ResetPasswordForm />
                      </CustomModal>
                    </Stack>
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                      isLoading={isSubmitting}>
                      Zaloguj
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
export default LoginForm;
