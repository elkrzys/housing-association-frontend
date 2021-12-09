import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  Heading,
  InputGroup,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import UsersService from '../../services/UsersService';
import { AuthContext } from '../../contexts';
import { useContext, useState } from 'react';
import { BasicInput } from '../Inputs';

const AddBuildingForm = () => {
  const flexBg = useColorModeValue('none', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const checkPasswords = (password1, password2) => {
    if (password1 !== password2) {
      toast({
        title: 'Nowe hasło musi się zgadzać z potwierdzonym',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      });
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
      console.log('change successful');
      actions.resetForm({
        values: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      });
      toast({
        title: 'Hasło zmienione pomyślnie',
        status: 'success',
        isClosable: true,
        duration: 2500,
      });
    } else {
      console.log('change failed');
      toast({
        title: 'Hasło nie zostało zmienione',
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
        city: '',
        district: '',
        street: '',
        number: '',
        type: '',
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex align={'start'} justify={'center'} bg={flexBg}>
            <Stack spacing={8} mx={'auto'} px={6}>
              <Box
                rounded={'lg'}
                bg={boxBg}
                // boxShadow={'lg'}
                w={'md'}
                px={8}>
                <Stack spacing={4}>
                  <Stack align="left">
                    <Heading fontSize="md">Adres</Heading>
                  </Stack>
                  <HStack alignItems="end">
                    <BasicInput
                      id="city"
                      name="city"
                      placeholder="Miasto"
                      defaultValue={props.values.city}
                      isRequired
                    />
                    <BasicInput
                      id="district"
                      name="district"
                      placeholder="Dzielnica"
                      defaultValue={props.values.district}
                    />
                  </HStack>
                  <BasicInput
                    id="street"
                    name="street"
                    placeholder="Ulica"
                    defaultValue={props.values.street}
                    isRequired
                  />
                  <BasicInput
                    id="number"
                    name="number"
                    label="Numer budynku"
                    defaultValue={props.values.number}
                    isRequired
                  />
                  <Stack spacing={10}>
                    <Button
                      bg={'green.300'}
                      color={'white'}
                      _hover={{
                        bg: 'green.400',
                      }}
                      type={'submit'}
                      isLoading={props.isSubmitting}>
                      Dodaj
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
export default AddBuildingForm;
