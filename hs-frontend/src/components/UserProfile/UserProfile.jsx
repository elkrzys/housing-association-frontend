import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { BasicInput } from '../Inputs';
import { AuthContext } from '../../contexts/AuthContext';
import { UsersService } from '../../services';
import CustomModal from '../CustomModal';
import ChangePasswordForm from './ChangePasswordForm';
import UnregisterForm from './UnregisterForm';
import { ToastError, ToastSuccess } from '../Toasts';

const UserProfile = () => {
  const { user, refreshUser, signOut } = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [fullUser, setUser] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirected, setIsRedirected] = useState(false);

  const getUser = async () => {
    const response = await UsersService.getUser(user.id);
    if (response.status === 'SUCCESS') {
      setUser(response.data);
    } else {
      return null;
    }
  };

  useEffect(() => {
    !isRedirected && getUser();
  }, [user]);

  const onUnregisterSuccess = () => {
    setIsRedirected(true);
    signOut();
    history.replace('/login');
  };

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
      ToastSuccess(toast, 'Pomyślnie zapisano');
    } else {
      ToastError(toast, 'Wystąpił problem.');
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
      {({ values, isSubmitting }) => (
        <Flex w="full">
          <Stack spacing="8">
            <Form>
              <Box
                w={{ base: '100%', md: '50%' }}
                mx={{ base: '0', md: 'auto' }}
                rounded="lg"
                bg="white"
                boxShadow="lg"
                p="8">
                <Stack spacing="4">
                  <BasicInput
                    id="firstName"
                    name="firstName"
                    label="Imię"
                    defaultValue={values.firstName}
                    type="text"
                    isDisabled={isDisabled}
                    isRequired={!isDisabled}
                  />
                  <BasicInput
                    id="lastName"
                    name="lastName"
                    label="Nazwisko"
                    defaultValue={values.lastName}
                    type="text"
                    isDisabled={isDisabled}
                    isRequired={!isDisabled}
                  />
                  <BasicInput
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={values.email}
                    type="email"
                    isDisabled={isDisabled}
                    isRequired={!isDisabled}
                  />
                  <BasicInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    defaultValue={values.phoneNumber}
                    type="tel"
                    isDisabled={isDisabled}
                    isRequired={!isDisabled}
                  />

                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align="start"
                      justify="flex-end">
                      <Button onClick={onOpen} color="blue.400">
                        Zmień hasło
                      </Button>
                      <CustomModal isOpen={isOpen} onClose={onClose}>
                        <ChangePasswordForm />
                      </CustomModal>
                      <Button onClick={onDeleteOpen} color="red.400">
                        Usuń konto
                      </Button>
                      <CustomModal
                        isOpen={isDeleteOpen}
                        onClose={onDeleteClose}>
                        <UnregisterForm
                          onClose={onDeleteClose}
                          onUnregister={onUnregisterSuccess}
                        />
                      </CustomModal>
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
                        {isDisabled ? 'Edytuj dane' : 'Zakończ edycję'}
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
                        isLoading={isSubmitting}>
                        Zaktualizuj dane
                      </Button>
                    </HStack>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
};
export default UserProfile;
