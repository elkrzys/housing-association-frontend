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
import {
  getSelections,
  getCities,
  getDistricts,
  getStreets,
  getBuildings,
  getAddressErrorEnding,
  handleSetValues,
} from './functions';
import DynamicAddressSelect from './DynamicAddressSelect';

const UpdateAnnouncementForm = ({ onEditClose, announcement }) => {
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [preSelectionLoaded, setPreSelectionLoaded] = useState(false);
  const toast = useToast();

  let defaultSelections = {
    cities: [],
    districts: [],
    streets: [],
    buildingsIds: [],
    buildings: [],
  };

  const [prevSelections, setPrevSelections] = useState(defaultSelections);
  const handleRefresh = () => setRefresh(!refresh);

  const getCurrentSelections = async () => {
    try {
      const selections = await getSelections(defaultSelections, announcement);
      setPrevSelections(selections);
    } catch {
      ToastError(toast, 'Wystąpił problem podczas pobierania budynków');
    }
  };

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
    if (!preSelectionLoaded) {
      getCurrentSelections();
    }
    if (!cities.length)
      getCities(
        values => handleSetValues(values, setCities, handleRefresh),
        handleToastError,
      );
    if (prevSelections.streets.length === 1 && !preSelectionLoaded) {
      getStreets(
        prevSelections.cities[0],
        prevSelections.districts?.[0],
        values => handleSetValues(values, setStreets, handleRefresh),
        handleToastError,
      );
      getBuildings(
        prevSelections.cities[0],
        prevSelections.districts?.[0],
        prevSelections.streets,
        values => handleSetValues(values, setBuildings, handleRefresh),
        handleToastError,
      );
      setPreSelectionLoaded(true);
    }
    if (
      (prevSelections.cities.length === 1 ||
        prevSelections.districts.length === 1) &&
      !preSelectionLoaded
    ) {
      getDistricts(
        prevSelections.cities[0],
        values => handleSetValues(values, setDistricts, handleRefresh),
        handleToastError,
      );
      getStreets(
        prevSelections.cities[0],
        prevSelections.districts?.[0],
        values => handleSetValues(values, setStreets, handleRefresh),
        handleToastError,
      );
      setPreSelectionLoaded(true);
    }
  }, [refresh]);

  const initialValues = {
    title: announcement.title,
    content: announcement.content,
    cities: prevSelections?.cities || [],
    districts: prevSelections?.districts || [],
    streets: prevSelections?.streets || [],
    buildings: prevSelections?.buildingsIds || [],
    expirationDate: new Date(announcement.expirationDate)
      .toISOString()
      .split('T')[0],
  };

  const setSubmit = async (values, actions) => {
    announcement.title = values.title;
    announcement.content = values.content;
    announcement.expirationDate = values.expirationDate;
    announcement.authorId = user.id;

    const response = await AnnouncementsService.updateAnnouncement(
      announcement,
      values.cities,
      values.districts,
      values.streets,
      values.buildings,
    );

    if (response.status === 'SUCCESS') {
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
      ToastSuccess(toast, 'Ogłoszenie zaktualizowane pomyślnie');
      onEditClose();
    } else {
      ToastError(toast, 'Ogłoszenie nie zostało zaktualizowane');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
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
                      Zaktualizuj
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
export default UpdateAnnouncementForm;
