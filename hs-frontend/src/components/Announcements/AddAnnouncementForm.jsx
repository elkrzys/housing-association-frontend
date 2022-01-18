import React, { useContext, useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  FormLabel,
  FormControl,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { AnnouncementsService } from '../../services';
import { AuthContext } from '../../contexts';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import DatePickerField from '../DatePickerField';
import DynamicAddressSelect from './DynamicAddressSelect';
import {
  getCities,
  getDistricts,
  getStreets,
  getBuildings,
  getAddressErrorEnding,
  handleSetValues,
} from './functions';

const AddAnnouncementForm = ({ onAddClose }) => {
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  let defaultExpirationDate = new Date();
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);
  const [expirationDate] = useState(defaultExpirationDate);

  const handleRefresh = () => setRefresh(!refresh);
  const handleSelectCities = async values => {
    if (values.length === 1) {
      await getDistricts(
        values[0],
        values => handleSetValues(values, setDistricts, handleRefresh),
        handleToastError,
      );
      await getStreets(
        values[0],
        null,
        values => handleSetValues(values, setStreets, handleRefresh),
        handleToastError,
      );
    }
  };
  const handleSelectDistricts = async values => {
    if (values.length === 1) {
      await getStreets(
        values.cities[0],
        values.districts[0],
        values => handleSetValues(values, setStreets, handleRefresh),
        handleToastError,
      );
    }
  };
  const handleSelectStreets = async (city, values, district) => {
    if (values.length) {
      await getBuildings(
        city,
        values,
        district,
        values => handleSetValues(values, setBuildings, handleRefresh),
        handleToastError,
      );
    }
  };
  const handleToastError = source => {
    const ending = getAddressErrorEnding(source);
    ToastError(toast, `Wystąpił problem podczas pobierania ${ending}.`);
  };

  useEffect(() => {
    if (!cities.length)
      getCities(
        values => handleSetValues(values, setCities, handleRefresh),
        handleToastError,
      );
  }, [refresh]);

  const setSubmit = async (values, actions) => {
    let response;
    if (values.buildings.length) {
      response = await AnnouncementsService.addByBuildings(
        values.title,
        values.content,
        values.expirationDate,
        user.id,
        values.buildings,
      );
    } else {
      response = await AnnouncementsService.addByAddress(
        values.title,
        values.content,
        values.expirationDate,
        user.id,
        values.cities,
        values.districts,
        values.streets,
      );
    }
    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Ogłoszenie dodane pomyślnie');
      onAddClose();
    } else {
      ToastError(toast, 'Ogłoszenie nie zostało dodane');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: '',
        content: '',
        cities: [],
        districts: [],
        streets: [],
        buildings: [],
        expirationDate: expirationDate,
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
                  <Box>
                    <p>Data wygaśnięcia</p>
                    <DatePickerField name="expirationDate" w="50%" />
                  </Box>
                  <FormControl id="content" isRequired>
                    <FormLabel>Treść ogłoszenia</FormLabel>
                    <Textarea
                      placeholder="Wpisz treść ogłoszenia"
                      defaultValue={values.content}
                      onChange={handleChange}
                      rows="8"
                      p="3"
                    />
                  </FormControl>
                  <DynamicAddressSelect
                    values={values}
                    cities={cities}
                    districts={districts}
                    streets={streets}
                    buildings={buildings}
                    handleSelectCities={handleSelectCities}
                    handleSelectDistricts={handleSelectDistricts}
                    handleSelectStreets={handleSelectStreets}
                  />
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
