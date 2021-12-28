import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  FormLabel,
  FormControl,
  Heading,
  InputGroup,
  useColorModeValue,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import UsersService from '../../services/UsersService';
import { AnnouncementsService, BuildingsService } from '../../services';
import { AuthContext } from '../../contexts';
import { useContext, useState } from 'react';
import { BasicInput, MultiSelect } from '../Inputs';
import { useEffect } from 'react/cjs/react.development';
import { ToastError, ToastSuccess } from '../Toasts';

const buttonProps = {
  borderColor: 'gray.600',
  borderWidth: '1px',
};

const AddAnnouncementForm = () => {
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  const getCities = async () => {
    const response = await BuildingsService.getCities();
    if (response.status === 'SUCCESS') {
      setCities(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania miast');
    }
  };
  const getDistricts = async city => {
    const response = await BuildingsService.getDistricts(city);
    if (response.status === 'SUCCESS') {
      setDistricts(response.data);
      setRefresh(!refresh);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania dzielnic');
    }
  };
  const getStreets = async (city, district) => {
    const response = await BuildingsService.getStreets(city, district);
    if (response.status === 'SUCCESS') {
      setStreets(response.data);
      setRefresh(!refresh);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania ulic');
    }
  };
  const getBuildings = async (city, streets, district = null) => {
    const response = await BuildingsService.getBuildingsByAddresses(
      city,
      district,
      streets,
    );
    if (response.status === 'SUCCESS') {
      setBuildings(response.data);
      setRefresh(!refresh);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania budynków');
    }
  };

  useEffect(() => {
    getCities();
  }, [refresh]);

  const setSubmit = async (values, actions) => {
    let response;
    if (values.buildings.length) {
      response = AnnouncementsService.addByBuildings(
        values.title,
        values.content,
        user.id,
        values.buildings,
      );
    } else {
      response = AnnouncementsService.addByAddress(
        values.title,
        values.content,
        user.id,
        values.cities,
        values.districts,
        values.streets,
      );
    }
    if (response.status === 'SUCCESS') {
      console.log('change successful');
      actions.resetForm({
        values: {
          title: '',
          content: '',
          cities: [],
          districts: [],
          streets: [],
          buildings: [],
        },
      });
      ToastSuccess(toast, 'Ogłoszenie dodane pomyślnie');
    } else {
      console.log('change failed');
      toast(toast, 'Ogłoszenie nie zostało dodane');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        cities: [],
        districts: [],
        streets: [],
        buildings: [],
      }}
      onSubmit={setSubmit}>
      {({ values, isSubmitting, handleChange }) => (
        <Form>
          <Flex align="start" justify="center" bg="none">
            <Stack spacing="8" mx="auto" px="6">
              <Box rounded="lg" bg="white" w="md" px="8">
                <Stack spacing="4">
                  <BasicInput
                    label="Tytuł"
                    id="title"
                    name="title"
                    placeholder="Tytuł"
                    defaultValue={values.title}
                    isRequired
                  />
                  <FormControl id="content" isRequired>
                    <FormLabel>Treść ogłoszenia</FormLabel>
                    <Textarea
                      placeholder="Wpisz treść ogłoszenia"
                      defaultValue={values.content}
                      rows="8"
                      p="3"
                    />
                  </FormControl>

                  <Stack>
                    {cities.length && (
                      <MultiSelect
                        label="Miasta"
                        options={cities}
                        onChange={async vals => {
                          handleChange({
                            target: { value: vals, id: 'cities' },
                          });
                          if (vals.length < 2) {
                            await getDistricts(vals[0]);
                            await getStreets(vals[0]);
                          }
                        }}
                        buttonProps={buttonProps}
                      />
                    )}
                    {values.cities.length < 2 && districts.length && (
                      <MultiSelect
                        label="Dzielnice"
                        options={districts}
                        onChange={async vals => {
                          handleChange({
                            target: { value: vals, id: 'districts' },
                          });
                          if (vals.length < 2) {
                            await getStreets(vals[0], vals[0]);
                          }
                        }}
                        buttonProps={buttonProps}
                      />
                    )}
                    {values.cities.length < 2 &&
                      values.districts.length < 2 &&
                      streets.length && (
                        <MultiSelect
                          label="Ulice"
                          options={streets}
                          onChange={async vals => {
                            handleChange({
                              target: { value: vals, id: 'streets' },
                            });
                            await getBuildings(values.cities[0], vals[0]);
                          }}
                          buttonProps={buttonProps}
                        />
                      )}
                    {values.cities.length < 2 &&
                      values.districts.length < 2 &&
                      values.streets.length > 0 &&
                      buildings.length && (
                        <MultiSelect
                          label="Budynki"
                          complexOptions={buildings.map(building => ({
                            id: building.id,
                            name: `${building.address.street} ${building.number}`,
                          }))}
                          onChange={values => {
                            handleChange({
                              target: { value: values, id: 'buildings' },
                            });
                          }}
                          buttonProps={buttonProps}
                        />
                      )}
                  </Stack>
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
export default AddAnnouncementForm;
