import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { BasicInput, PasswordInput } from '../Inputs';
import ResetPasswordModal from './ResetPasswordModal';

const LoginForm = () => {
  const flexBg = useColorModeValue('none', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const { signIn } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line consistent-return
  const setSubmit = async (values, actions) => {
    if (await signIn(values.email, values.password)) {
      console.log('login successful');
      return <Redirect to="/home" />;
    }
    console.log('login failed');
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex
            // minH={'100vh'}
            align="start"
            justify="center"
            bg={flexBg}>
            <Stack w="100%" spacing={8} mx="auto" py={6} px={6}>
              <Stack align="center">
                <Heading fontSize="2xl">Zaloguj się</Heading>
              </Stack>
              <Box rounded="lg" bg={boxBg} boxShadow="lg" p={8}>
                <Stack spacing={4}>
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
                      <ResetPasswordModal isOpen={isOpen} onClose={onClose} />
                    </Stack>

                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                      isLoading={props.isSubmitting}>
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
