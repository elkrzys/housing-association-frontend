import React, { useContext, useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Box,
  Heading,
  Stack,
  Button,
  FormLabel,
  FormControl,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { AnnouncementsService, BuildingsService } from '../../services';
import { AuthContext } from '../../contexts';
import { BasicInput, ReactSelect } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import DatePickerField from '../DatePickerField';
import { getSelections } from './functions';

const UpdateAnnouncementForm = ({ onEditClose, announcement }) => {
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [reselectedAddress, setReselectedAddress] = useState(false);
  const [preSelectionLoaded, setPreSelectionLoaded] = useState(false);

  const toast = useToast();

  let defaultExpirationDate = new Date();
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);
  const [expirationDate, setExpirationDate] = useState(defaultExpirationDate);

  let defaultSelections = {
    cities: [],
    districts: [],
    streets: [],
    buildingsIds: [],
    buildings: [],
  };

  const [prevSelections, setPrevSelections] = useState(defaultSelections);

  const getCurrentSelections = async () => {
    try {
      const selections = await getSelections(defaultSelections, announcement);
      setPrevSelections(selections);
    } catch {
      ToastError(toast, 'Wystąpił problem podczas pobierania budynków');
    }
  };

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
  const handleSelectCities = async values => {
    if (values.length === 1) {
      await getDistricts(values[0]);
      await getStreets(values[0]);
    }
    setReselectedAddress(true);
  };
  const handleSelectDistricts = async values => {
    if (values.length === 1) {
      await getStreets(values.cities[0], values.districts[0]);
    }
  };
  const handleSelectStreets = async (city, values, district) => {
    if (values.length) {
      await getBuildings(city, values, district);
    }
  };

  const showActualAddresses = () => {
    return (
      <>
        <Text>Miasta: {prevSelections.cities.map(c => `${c}, `)}</Text>
        {prevSelections.districts?.length !== 0 &&
          prevSelections.cities.length === 1 && (
            <Text>
              Dzielnice: {prevSelections.districts.map(d => `${d}, `)}
            </Text>
          )}
        {prevSelections.streets.length && (
          <Text>Ulice: {prevSelections.streets.map(s => `${s}, `)}</Text>
        )}
        {prevSelections.streets.length === 1 && (
          <Text>
            Numery budynków:
            {prevSelections.buildings.map(b => `${b.number}, `)}
          </Text>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!cities.length) getCities();
    if (!preSelectionLoaded) {
      getCurrentSelections();
      setReselectedAddress(true);
    }
    if (prevSelections.streets.length === 1 && !preSelectionLoaded) {
      getStreets(prevSelections.cities[0], prevSelections.districts?.[0]);
      getBuildings(
        prevSelections.cities[0],
        prevSelections.districts?.[0],
        prevSelections.streets,
      );
      setPreSelectionLoaded(true);
    }
    if (
      (prevSelections.cities.length === 1 ||
        prevSelections.districts.length === 1) &&
      !preSelectionLoaded
    ) {
      getDistricts(prevSelections.cities[0]);
      getStreets(prevSelections.cities[0], prevSelections.districts?.[0]);
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
      ToastSuccess(toast, 'Ogłoszenie dodane pomyślnie');
      onEditClose();
    } else {
      ToastError(toast, 'Ogłoszenie nie zostało dodane');
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
                  {!reselectedAddress && (
                    <Box>
                      <Heading fontSize="sm">Aktualne adresy</Heading>
                      <Box maxH="250px" overflow="auto">
                        {showActualAddresses()}
                      </Box>
                    </Box>
                  )}
                  <Stack>
                    {cities.length && (
                      <ReactSelect
                        options={cities.map(c => ({ value: c, label: c }))}
                        isMulti={true}
                        name="cities"
                        openMenuOnClick={true}
                        onChange={async vals => await handleSelectCities(vals)}
                        placeholder="Miasta"
                      />
                    )}
                    {values.cities.length === 1 && districts.length && (
                      <ReactSelect
                        options={districts.map(d => ({ value: d, label: d }))}
                        isMulti={true}
                        name="districts"
                        openMenuOnClick={true}
                        onChange={async vals =>
                          await handleSelectDistricts(vals)
                        }
                        placeholder="Dzielnice"
                      />
                    )}
                    {values.cities.length === 1 &&
                      values.districts.length < 2 &&
                      streets.length && (
                        <ReactSelect
                          options={streets.map(s => ({ value: s, label: s }))}
                          isMulti={true}
                          name="streets"
                          openMenuOnClick={true}
                          onChange={async vals =>
                            await handleSelectStreets(
                              values.cities[0],
                              vals,
                              values.districts?.[0],
                            )
                          }
                          placeholder="Ulice"
                        />
                      )}
                    {values.cities.length === 1 &&
                      values.districts.length < 2 &&
                      values.streets.length === 1 &&
                      buildings.length && (
                        <ReactSelect
                          options={buildings.map(b => ({
                            value: b.id,
                            label: `${b.address.street} ${b.number}`,
                          }))}
                          isMulti={true}
                          name="buildings"
                          openMenuOnClick={true}
                          placeholder="Budynki"
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
