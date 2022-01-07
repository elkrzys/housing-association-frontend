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
import { Field, Form, Formik } from 'formik';
import { AnnouncementsService, BuildingsService } from '../../services';
import { AuthContext } from '../../contexts';
import { BasicInput, MultiSelect } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import DatePickerField from '../DatePickerField';

const buttonProps = {
  borderColor: 'gray.600',
  borderWidth: '1px',
};

const UpdateAnnouncementForm = ({ onEditClose, announcement }) => {
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectionChanged, setSelectionChanged] = useState(false);
  const toast = useToast();

  let defaultExpirationDate = new Date();
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);
  const [expirationDate, setExpirationDate] = useState(defaultExpirationDate);

  let defaultSelections = {
    cities: [],
    districts: [],
    streets: [],
    buildings: [],
  };

  const [prevSelections, setPrevSelections] = useState(defaultSelections);

  const getCurrentSelections = async () => {
    let selections = defaultSelections;
    selections.cities = [
      ...new Set(announcement.addresses.map(address => address.city)),
    ];
    if (selections.cities.length < 2) {
      selections.districts = [
        ...new Set(announcement.addresses.map(address => address.district)),
      ];
      selections.districts = selections.districts.filter(d => d !== null);
      if (selections.districts.length < 2) {
        selections.streets = [
          ...new Set(announcement.addresses.map(address => address.street)),
        ];
        if (selections.streets.length) {
          selections.buildings = [...announcement.targetBuildingsIds];
        }
      }
    }
    setPrevSelections(selections);

    if (prevSelections.cities.length < 2) {
      await getDistricts(prevSelections.cities[0]);
      if (prevSelections.districts.length < 2) {
        await getStreets(prevSelections.cities[0], prevSelections.districts[0]);
        if (prevSelections.streets.length) {
          await getBuildings(
            prevSelections.cities[0],
            prevSelections.streets,
            prevSelections.districts[0],
          );
        }
      }
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
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania dzielnic');
    }
  };

  const getStreets = async (city, district) => {
    const response = await BuildingsService.getStreets(city, district);
    if (response.status === 'SUCCESS') {
      setStreets(response.data);
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
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania budynków');
    }
  };

  useEffect(() => {
    getCities();
    getCurrentSelections();
  }, [refresh]);

  const initialValues = {
    title: announcement.title,
    content: announcement.content,
    cities: prevSelections?.cities || [],
    districts: prevSelections?.districts || [],
    streets: prevSelections?.streets || [],
    buildings: prevSelections?.buildings || [],
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

  const clearValues = (changedVals, values, newVals) => {
    switch (changedVals) {
      case 'cities':
        values.cities = newVals;
        values.districts = [];
        values.streets = [];
        values.buildings = [];
        break;
      case 'districts':
        values.districts = newVals;
        values.streets = [];
        values.buildings = [];
        break;
      case 'streets':
        values.streets = newVals;
        values.buildings = [];
        break;
      case 'buildings':
        values.buildings = newVals;
        break;
      default:
        break;
    }
    // if (!selectionChanged) {
    //   setPrevSelections(null);
    //   setSelectionChanged(true);
    // }
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
                  <Stack>
                    {cities.length && (
                      <MultiSelect
                        label="Miasta"
                        options={cities}
                        preSelectedOptions={prevSelections?.cities}
                        onChange={async vals => {
                          handleChange({
                            target: { value: vals, id: 'cities' },
                          });
                          clearValues('cities', values, vals);
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
                        preSelectedOptions={prevSelections?.districts}
                        onChange={async vals => {
                          handleChange({
                            target: { value: vals, id: 'districts' },
                          });
                          clearValues('districts', values, vals);
                          if (vals.length === 1) {
                            await getStreets(values.cities[0], vals[0]);
                            await getBuildings(values.cities[0], vals[0]);
                          }
                        }}
                        buttonProps={buttonProps}
                      />
                    )}
                    {values.cities.length === 1 &&
                      values.districts.length < 2 &&
                      streets.length && (
                        <MultiSelect
                          label="Ulice"
                          options={streets}
                          preSelectedOptions={prevSelections?.streets}
                          onChange={async vals => {
                            handleChange({
                              target: { value: vals, id: 'streets' },
                            });
                            clearValues('streets', values, vals);
                            if (vals.length === 1) {
                              await getBuildings(
                                values.cities[0],
                                vals,
                                values.districts[0],
                              );
                            }
                          }}
                          buttonProps={buttonProps}
                        />
                      )}
                    {values.cities.length === 1 &&
                      values.districts.length < 2 &&
                      values.streets.length === 1 &&
                      buildings.length && (
                        <MultiSelect
                          label="Budynki"
                          preSelectedOptions={prevSelections?.buildings}
                          complexOptions={buildings.map(building => ({
                            id: building.id,
                            name: `${building.address.street} ${building.number}`,
                          }))}
                          onChange={vals => {
                            handleChange({
                              target: { value: vals, id: 'buildings' },
                            });
                            clearValues('buildings', values, vals);
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
