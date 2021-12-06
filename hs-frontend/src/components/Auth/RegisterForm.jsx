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

const RegisterForm = () => {
  const flexBg = useColorModeValue('none', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const { signUp } = useContext(AuthContext);
  const toast = useToast();

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
      console.log('registration successful');
      actions.resetForm();
      toast({
        title: 'Pomyślnie zarejestrowano',
        status: 'success',
        isClosable: true,
        duration: 2500,
      });
    } else {
      console.log('registration failed');
      toast({
        title: 'Użytkownik już istnieje',
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
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex align="start" justify="center" bg={flexBg}>
            <Stack maxW="75%" spacing={8} mx="auto" py={6} px={6}>
              <Stack align="center">
                <Heading fontSize="2xl">Utwórz konto</Heading>
              </Stack>
              <Box rounded="lg" bg={boxBg} boxShadow="lg" py={6} px={8}>
                <Stack spacing={4}>
                  <HStack spacing={2}>
                    <BasicInput
                      id="firstName"
                      name="firstName"
                      label="Imię"
                      defaultValue={props.values.firstName}
                      type="text"
                      isRequired
                    />

                    <BasicInput
                      id="lastName"
                      name="lastName"
                      label="Nazwisko"
                      defaultValue={props.values.lastName}
                      type="text"
                      isRequired
                    />
                  </HStack>

                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={props.values.phoneNumber}
                    type="tel"
                    isRequired
                  />

                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={props.values.email}
                    type="email"
                    isRequired
                  />

                  <PasswordInput
                    id="password"
                    name="password"
                    label="Hasło"
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

                  <Stack pt={4}>
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{ bg: 'blue.500' }}
                      type="submit"
                      isLoading={props.isSubmitting}>
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
