import { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Button,
  Stack,
  HStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { BasicInput } from '../Inputs';
import { BuildingsService } from '../../services';
import { ToastError, ToastSuccess } from '../Toasts';

const UpdateBuildingForm = ({ buildingId }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [building, setBuilding] = useState(null);

  const toast = useToast();

  const getBuilding = async () => {
    const response = await BuildingsService.getById(buildingId);
    if (response.status === 'SUCCESS') {
      setBuilding(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem przy wczytywaniu budynku');
    }
  };

  useEffect(() => {
    getBuilding();
  }, []);

  const setSubmit = async (values, actions) => {
    let response = await BuildingsService.updateBuilding(
      building.id,
      values.city,
      values.district,
      values.street,
      values.number,
      values.type,
    );

    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Budynek zaktualizowany');
    } else {
      ToastError(toast, 'Wystąpił problem');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        city: building?.address.city,
        district: building?.address.district,
        street: building?.address.street,
        number: building?.number,
        type: building?.type,
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex align="start" justify="center" bg="white">
            <Stack spacing="8" mx="auto" px="6">
              <Box rounded="lg" w="md" px="8">
                <Stack spacing="4">
                  <Stack align="left">
                    <Heading fontSize="md">Adres</Heading>
                  </Stack>
                  <HStack alignItems="end">
                    <BasicInput
                      id="city"
                      name="city"
                      placeholder="Miasto"
                      defaultValue={props.values.city}
                      isRequired={!isDisabled}
                      isDisabled={isDisabled}
                    />
                    <BasicInput
                      id="district"
                      name="district"
                      placeholder="Dzielnica"
                      defaultValue={props.values.district}
                      isDisabled={isDisabled}
                    />
                  </HStack>
                  <BasicInput
                    id="street"
                    name="street"
                    placeholder="Ulica"
                    defaultValue={props.values.street}
                    isRequired={!isDisabled}
                    isDisabled={isDisabled}
                  />
                  <BasicInput
                    id="number"
                    name="number"
                    label="Numer budynku"
                    defaultValue={props.values.number}
                    isRequired={!isDisabled}
                    isDisabled={isDisabled}
                  />
                  <Stack spacing={10}>
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
export default UpdateBuildingForm;
