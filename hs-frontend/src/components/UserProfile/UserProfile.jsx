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
import { Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { BasicInput } from '../Inputs';
import { AuthContext } from '../../contexts/AuthContext';
import { UsersService } from '../../services';

const UserProfile = () => {
  const flexBg = useColorModeValue('none', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');

  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fullUser, setUser] = useState(null);
  const [isEditEnabled, enableEdit] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await UsersService.getUser(user.id);
      console.log(response);
      if (response.status === 'SUCCESS') setUser(response.data);
      else console.log('failure dirung user fething');
    };
    getUser();
  }, []);

  const setSubmit = async (values, actions) => {
    // if (
    //   await UsersService.updateUser(
    //     user.id,
    //     values.firstName,
    //     values.lastName,
    //     values.phoneNumber,
    //     values.email
    //   )
    // ) {
    //   console.log('update successful');
    // } else {
    //   console.log('update failed');
    // }
    // actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: fullUser?.firstName,
        lastName: fullUser?.lastName,
        email: fullUser?.email,
        phoneNumber: fullUser?.phoneNumber,
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex
            // minH={'100vh'}
            align="start"
            justify="center"
            bg={flexBg}>
            <Stack spacing={8} mx="auto" py={6} px={6}>
              <Stack align="center">
                <Heading fontSize="2xl">Zaloguj się</Heading>
              </Stack>
              <Box rounded="lg" bg={boxBg} boxShadow="lg" maxW="md" p={8}>
                <Stack spacing={4}>
                  <BasicInput
                    id="firstName"
                    name="firstName"
                    label="Imię"
                    defaultValue={props.values.firstName}
                    type="text"
                    isDisabled={isEditEnabled}
                    isRequired
                  />
                  <BasicInput
                    id="lastName"
                    name="lastName"
                    label="Nazwisko"
                    defaultValue={props.values.lastName}
                    type="text"
                    isDisabled={isEditEnabled}
                    isRequired
                  />
                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={props.values.email}
                    type="email"
                    isDisabled={isEditEnabled}
                    isRequired
                  />
                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={props.values.phoneNumber}
                    type="tel"
                    isDisabled={isEditEnabled}
                    isRequired
                  />

                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align="start"
                      justify="flex-end">
                      <Button onClick={onOpen} color="blue.400">
                        Zmień hasło
                      </Button>
                      {/* <ResetPasswordModal isOpen={isOpen} onClose={onClose} /> */}
                    </Stack>

                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={() => enableEdit(!isEditEnabled)}>
                      Edytuj dane
                    </Button>
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                      isLoading={props.isSubmitting}>
                      Zaktualizuj dane
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
export default UserProfile;
