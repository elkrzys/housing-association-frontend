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
import { AuthContext } from '../../contexts';
import { useContext, useState } from 'react';
import { BasicInput, MultiSelect } from '../Inputs';
import { useEffect } from 'react/cjs/react.development';

const cities = ['Tychy', 'Katowice'];
const districts = ['Osiedle A', 'Osiedle B'];
const streets = ['Katowicka', 'Bielska', 'Poziomkowa'];
const buildings = [
  {
    id: 1,
    number: '1',
    address: { id: 1, city: 'Tychy', district: null, street: 'Katowicka' },
  },
  {
    id: 2,
    number: '2',
    address: { id: 1, city: 'Tychy', district: null, street: 'Katowicka' },
  },
  {
    id: 3,
    number: '6',
    address: { id: 1, city: 'Tychy', district: null, street: 'Katowicka' },
  },
  {
    id: 4,
    number: '120',
    address: { id: 1, city: 'Tychy', district: null, street: 'Bielska' },
  },
];

const AddAnnouncementForm = () => {
  const toast = useToast();

  const setSubmit = async (values, actions) => {
    if (response.status === 'SUCCESS') {
      console.log('change successful');
      actions.resetForm({
        values: {
          title: '',
          content: '',
          cities: [],
          districts: [],
          streets: [],
        },
      });
      toast({
        title: 'Ogłoszenie dodane pomyślnie',
        status: 'success',
        isClosable: true,
        duration: 2500,
      });
    } else {
      console.log('change failed');
      toast({
        title: 'Ogłoszenie nie zostało dodane',
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
              <Box
                rounded="lg"
                bg="white"
                // boxShadow={'lg'}
                w="md"
                px="8">
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
                        onChange={values => {
                          handleChange({
                            target: { value: values, id: 'cities' },
                          });
                        }}
                        buttonProps={{
                          borderColor: 'gray.600',
                          borderWidth: '1px',
                        }}
                      />
                    )}
                    {values.cities.length < 2 && districts.length && (
                      <MultiSelect
                        label="Dzielnice"
                        options={districts}
                        onChange={values => {
                          handleChange({
                            target: { value: values, id: 'districts' },
                          });
                        }}
                        buttonProps={{
                          borderColor: 'gray.600',
                          borderWidth: '1px',
                        }}
                      />
                    )}
                    {values.cities.length < 2 &&
                      values.districts.length < 2 &&
                      streets.length && (
                        <MultiSelect
                          label="Ulice"
                          options={streets}
                          onChange={values => {
                            handleChange({
                              target: { value: values, id: 'streets' },
                            });
                            console.log(values);
                          }}
                          buttonProps={{
                            borderColor: 'gray.600',
                            borderWidth: '1px',
                          }}
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
                            console.log(values);
                          }}
                          buttonProps={{
                            borderColor: 'gray.600',
                            borderWidth: '1px',
                          }}
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
