import { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  FormLabel,
  FormControl,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Select } from 'react-select';
import { Field, Form, Formik } from 'formik';
import { DocumentsService, IssuesService } from '../../services';
import { AuthContext } from '../../contexts';
import { BasicInput, MultiSelect } from '../Inputs';
import { LocalsService } from '../../services';
import { ToastError, ToastSuccess } from '../Toasts';
import FileDragAndDrop from '../FileDragAndDrop';

const AddDocumentForm = ({ locals, onAddClose }) => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();

  const options = [
    { value: '1', label: 'Jan Kowalski' },
    { value: '2', label: 'Marek Pieczarek' },
    { value: '3', label: 'Janina Koniczyna' },
  ];

  const setSubmit = async (values, actions) => {
    if (!values.file)
      ToastError(toast, 'Należy wybrać dokument do przesłania', 3000);
    console.log(values.file.name);
    // let response = await DocumentsService.uploadDocument(
    //   values.title,
    //   values.content,
    //   JSON.parse(values.local),
    //   user.id,
    // );

    // if (response.status === 'SUCCESS') {
    //   console.log('add successful');
    //   actions.resetForm({
    //     values: {
    //       title: '',
    //       content: '',
    //     },
    //   });
    //   ToastSuccess(toast, 'Zgłoszenie dodane pomyślnie');
    //   onAddClose();
    // } else {
    //   ToastError(toast, 'Zgłoszenie nie zostało dodane');
    // }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        file: null,
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
                    <FileDragAndDrop name="file" />
                  </Box>
                  {role !== 'Resident' && (
                    <FormControl id="targetUsers" isRequired>
                      <FormLabel>Wybierz odbiorców</FormLabel>
                      <ReactSelect options={options} />
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
