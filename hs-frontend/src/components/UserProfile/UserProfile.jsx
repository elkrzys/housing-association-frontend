import {
  Flex,
  Box,
  Stack,
  HStack,
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
import ChangePasswordModal from './ChangePasswordModal';

const UserProfile = () => {
  const flexBg = useColorModeValue('none', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');

  const { user, refreshUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fullUser, setUser] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const getUser = async () => {
    const response = await UsersService.getUser(user.id);
    if (response.status === 'SUCCESS') {
      setUser(response.data);
      return response.data;
    } else {
      console.log('failure dirung user fething');
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const setSubmit = async (values, actions) => {
    let response = await UsersService.updateUser(
      user.id,
      values.firstName,
      values.lastName,
      values.phoneNumber,
      values.email,
    );
    if (response) {
      let updatedUser = await getUser();
      let newUser = (({ phoneNumber, ...others }) => ({ ...others }))(
        updatedUser,
      );
      refreshUser(newUser);
      setIsDisabled(true);
      console.log('update successful: ' + response);
    } else {
      console.log('update failed: ' + response);
    }
    actions.setSubmitting(false);
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
            mx="auto"
            minH="100%"
            minW="100%"
            align="start"
            justify="center"
            bg={flexBg}>
            <Stack spacing={8} py={6}>
              <Box w={'100%'} rounded="lg" bg={boxBg} boxShadow="lg" p={8}>
                <Stack spacing={4}>
                  <BasicInput
                    id="firstName"
                    name="firstName"
                    label="Imię"
                    defaultValue={props.values.firstName}
                    type="text"
                    isDisabled={isDisabled}
                    isRequired
                  />
                  <BasicInput
                    id="lastName"
                    name="lastName"
                    label="Nazwisko"
                    defaultValue={props.values.lastName}
                    type="text"
                    isDisabled={isDisabled}
                    isRequired
                  />
                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={props.values.email}
                    type="email"
                    isDisabled={isDisabled}
                    isRequired
                  />
                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={props.values.phoneNumber}
                    type="tel"
                    isDisabled={isDisabled}
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
                      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
                    </Stack>
                    <HStack>
                      <Button
                        w="50%"
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        onClick={() => setIsDisabled(!isDisabled)}>
                        Edytuj dane
                      </Button>
                      <Button
                        w="50%"
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        type="submit"
                        isDisabled={isDisabled}
                        isLoading={props.isSubmitting}>
                        Zaktualizuj dane
                      </Button>
                    </HStack>
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
