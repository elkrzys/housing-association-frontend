import {
  Flex,
  Box,
  Stack,
  Button,
  FormLabel,
  FormControl,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { IssuesService } from '../../services';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';

const UpdateIssueForm = ({ locals, onEditClose, issue }) => {
  const toast = useToast();

  const setSubmit = async (values, actions) => {
    if (values.local == null)
      ToastError(
        toast,
        'Należy wybrać lokal, którego dotyczy zgłoszenie',
        3000,
      );

    let updatedLocal;
    if (values.local === '') {
      updatedLocal = {
        localId: issue.sourceLocalId,
        buildingId: issue.sourceBuildingId,
      };
    } else {
      updatedLocal = JSON.parse(values.local);
    }

    let response = await IssuesService.updateIssue(
      issue.id,
      values.title,
      values.content,
      issue.author,
      updatedLocal,
    );

    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Zgłoszenie zaktualizowane pomyślnie');
      onEditClose();
    } else {
      ToastError(toast, 'Zgłoszenie nie zostało zaktualizowane');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: issue.title,
        content: issue.content,
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
                          label={`${local.address?.street} ${local.buildingNumber}${localNumber}`}
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
                      Zapisz
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
export default UpdateIssueForm;
