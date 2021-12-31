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
import Select from 'react-select';
import { Form, Formik } from 'formik';
import { DocumentsService } from '../../services';
import { AuthContext } from '../../contexts';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';
import FileDragAndDrop from '../FileDragAndDrop';
import DatePickerField from '../DatePickerField';

const acceptedFileTypes = ['application/pdf'];

const AddDocumentForm = ({ onAddClose }) => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();

  const options = [
    { value: '1', label: 'Jan Kowalski' },
    { value: '2', label: 'Marek Pieczarek' },
    { value: '3', label: 'Janina Koniczyna' },
  ];

  let receiversIds = [];

  const setSubmit = async (values, actions) => {
    if (!values.file) {
      ToastError(toast, 'Należy wybrać dokument do przesłania');
    } else if (!acceptedFileTypes.some(type => type === values.file.type)) {
      ToastError(toast, 'Dokument ma nieprawidłowy format');
    } else {
      const response = await DocumentsService.uploadDocument(
        user.id,
        values.title,
        values.file,
        values.removes,
        receiversIds,
      );
      if (response.status === 'SUCCESS') {
        ToastSuccess(toast, 'Dokument przesłany');
        onAddClose();
      } else {
        ToastError(toast, 'Dokument nie został przesłany');
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        file: null,
        removes: null,
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
                    <>
                      <Box>
                        <p>Data wygaśnięcia</p>
                        <DatePickerField name="removes" w="50%" />
                      </Box>
                      <FormControl id="targetUsers" isRequired>
                        <FormLabel>Wybierz odbiorców</FormLabel>
                        <Select
                          options={options}
                          openMenuOnClick={false}
                          isMulti
                        />
                      </FormControl>
                    </>
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
