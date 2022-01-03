import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import { UsersService } from '../../services';

const AddWorkerForm = ({ onClose }) => {
  const toast = useToast();

  const setSubmit = async (values, actions) => {
    const worker = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
    };

    const response = await UsersService.addWorker(worker);
    if (response.status === 'SUCCESS') {
      actions.resetForm();
      onClose();
      ToastSuccess(toast, 'Pomyślnie dodano pracownika');
    } else {
      ToastError(toast, 'Pracownik już istnieje lub wystąpił problem');
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
      }}
      onSubmit={setSubmit}>
      {({ values, isSubmitting }) => (
        <Form>
          <Flex align="start" justify="center">
            <Stack w="100%" spacing="8" mx="auto" py="6" px="6">
              <Stack align="center">
                <Heading fontSize="2xl">Dodaj konto pracownika</Heading>
              </Stack>
              <Box rounded="lg" bg="white" boxShadow="lg" py="6" px="8">
                <Stack spacing="4">
                  <HStack spacing="2">
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
                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={values.phoneNumber}
                    type="tel"
                    isRequired
                  />
                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={values.email}
                    type="email"
                    isRequired
                  />
                  <Stack pt="4">
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{ bg: 'blue.500' }}
                      type="submit"
                      isLoading={isSubmitting}>
                      Zarejestruj pracownika
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
export default AddWorkerForm;
