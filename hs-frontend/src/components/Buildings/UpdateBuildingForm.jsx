import { useEffect, useState } from 'react';
import { Flex, Box, Button, Stack, HStack, Heading } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { BasicInput } from '../Inputs';
import { BuildingsService } from '../../services';

let tempBuilding = {
  id: null,
  number: 10,
  type: 'block',
  street: 'Pszczyńska',
  city: 'Tychy',
  distric: null,
};

const UpdateBuildingForm = ({ buildingId }) => {
  tempBuilding.id = buildingId;
  const [building, setBuilding] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const getBuildingById = async () => {
    const response = await BuildingsService.getBuildingById(buildingId);
    if (response.status === 'SUCCESS') {
      setBuilding(response.data);
    }
  };

  useEffect(() => {
    getBuildingById();
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
      console.log('update successful');
      toast({
        title: 'Budynek zaktualizowany',
        status: 'success',
        isClosable: true,
        duration: 2500,
      });
    } else {
      console.log('update failed');
      toast({
        title: 'Wystąpił problem',
        status: 'error',
        isClosable: true,
        duration: 2500,
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        city: building?.city,
        district: building?.district,
        street: building?.street,
        number: building?.number,
        type: building?.type,
      }}
      onSubmit={setSubmit}>
      {props => (
        <Form>
          <Flex align="start" justify="center" bg="white">
            <Stack spacing={8} mx={'auto'} px={6}>
              <Box rounded={'lg'} w={'md'} px={8}>
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
