import { useContext, useEffect, useState } from 'react';
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
import Select from 'react-select';
import { Field, Form, Formik } from 'formik';
import { IssuesService } from '../../services';
import { AuthContext } from '../../contexts';
import { BasicInput, MultiSelect } from '../Inputs';
import { LocalsService } from '../../services';
import { ToastError, ToastSuccess } from '../Toasts';

const AddDocumentForm = ({ locals, onAddClose }) => {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const setSubmit = async (values, actions) => {
    if (values.local == '')
      ToastError(
        toast,
        'Należy wybrać lokal, którego dotyczy zgłoszenie',
        3000,
      );

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
      ToastSuccess(toast, 'Zgłoszenie dodane pomyślnie');
      onAddClose();
    } else {
      ToastError(toast, 'Zgłoszenie nie zostało dodane');
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
                  {role !== 'Resident' && (
                    <FormControl id="targetUsers" isRequired>
                      <FormLabel>Wybierz odbiorców</FormLabel>
                      <Select options={options} />
                    </FormControl>
                  )}

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
export default AddDocumentForm;
