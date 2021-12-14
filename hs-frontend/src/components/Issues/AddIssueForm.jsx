import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  FormLabel,
  FormControl,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { IssuesService } from '../../services';
import { AuthContext } from '../../contexts';
import { useContext, useState } from 'react';
import { BasicInput, MultiSelect } from '../Inputs';

const locals = [
  {
    id: 1,
    buildingId: 1,
    buildingNumber: '100',
    number: '10',
  },
];

const AddIssueForm = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const setSubmit = async (values, actions) => {
    if (values.local == null) {
      toast({
        title: 'Należy wybrać lokal, którego dotyczy zgłoszenie',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }

    let response = await IssuesService.addIssue(
      values.title,
      values.content,
      JSON.parse(values.local),
      user.id,
    );
    console.log(response);

    if (response.status === 'SUCCESS') {
      console.log('add successful');
      actions.resetForm({
        values: {
          title: '',
          content: '',
        },
      });
      toast({
        title: 'Zgłoszenie dodane pomyślnie',
        status: 'success',
        isClosable: true,
        duration: 2500,
      });
    } else {
      console.log('change failed');
      toast({
        title: 'Zgłoszenie nie zostało dodane',
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
        local: '',
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
                    <FormLabel>Treść zgłoszenia</FormLabel>
                    <Textarea
                      placeholder="Wpisz treść zgłoszenia"
                      defaultValue={values.content}
                      rows="8"
                      onChange={handleChange}
                      p="3"
                    />
                  </FormControl>

                  <Select
                    placeholder="Wybierz lokal"
                    name="local"
                    onChange={handleChange}
                    values={values.local}>
                    {locals.map(local => {
                      let localNumber =
                        local.number !== '0' ? `/${local.number}` : '';
                      return (
                        <option
                          key={local.id}
                          value={JSON.stringify({
                            localId: local.id,
                            buildingId: local.buildingId,
                          })}
                          label={`Budynek nr: ${local.buildingNumber}${localNumber}`}
                        />
                      );
                    })}
                  </Select>

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
export default AddIssueForm;
