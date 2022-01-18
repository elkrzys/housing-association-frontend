import { useContext } from 'react';
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
import { LocalsService } from '../../services';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import { AuthContext } from '../../contexts';

const AddLocalByResidentForm = ({ refresh }) => {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const setSubmit = async (values, actions) => {
    let localIdResponse = await LocalsService.getLocalIdByDetails(
      values.buildingNumber,
      values.localNumber,
      { city: values.city, district: values.district, street: values.street },
    );
    if (localIdResponse.status !== 'SUCCESS') {
      ToastError(toast, 'Nie znaleziono takiego lokalu');
    } else {
      const response = await LocalsService.addLocalByResident(
        localIdResponse.data,
        user.id,
      );
      if (response.status === 'SUCCESS') {
        actions.resetForm({
          values: {
            city: '',
            district: null,
            street: '',
            buildingNumber: '',
            localNumber: '',
          },
        });
        ToastSuccess(toast, 'Lokal dodany');
        refresh();
      } else {
        ToastError(toast, 'Lokal nie został dodany');
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        localNumber: '',
        buildingNumber: '',
        city: '',
        district: '',
        street: '',
      }}
      onSubmit={setSubmit}>
      {({ values, isSubmitting }) => (
        <Form>
          <Flex align="start" justify="center" bg="none">
            <Stack spacing="8" mx="auto" px="6">
              <Box rounded="lg" bg="white" w="md" px="8">
                <Stack spacing="4">
                  <Stack align="left">
                    <Heading fontSize="md">Adres</Heading>
                  </Stack>
                  <HStack alignItems="end">
                    <BasicInput
                      id="city"
                      name="city"
                      label="Miasto"
                      placeholder="Warszawa"
                      defaultValue={values.city}
                      isRequired
                    />
                    <BasicInput
                      id="district"
                      name="district"
                      label="Dzielnica"
                      placeholder="Np. Praga Północ"
                      defaultValue={values.district}
                    />
                  </HStack>
                  <BasicInput
                    id="street"
                    name="street"
                    label="Ulica"
                    placeholder="Np. Niepodległości"
                    defaultValue={values.street}
                    isRequired
                  />
                  <HStack alignItems="end">
                    <BasicInput
                      id="buildingNumber"
                      name="buildingNumber"
                      label="Numer budynku"
                      placeholder="Np. 22"
                      defaultValue={values.buildingNumber}
                      isRequired
                    />
                    <BasicInput
                      id="localNumber"
                      name="localNumber"
                      label="Numer mieszkania"
                      placeholder="Np. 10"
                      defaultValue={values.localNumber}
                      isRequired
                    />
                  </HStack>
                  <Stack spacing="10">
                    <Button
                      bg="green.300"
                      color="white"
                      _hover={{
                        bg: 'green.400',
                      }}
                      type="submit"
                      isLoading={isSubmitting}>
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
export default AddLocalByResidentForm;
