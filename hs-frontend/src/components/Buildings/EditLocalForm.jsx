import { Flex, Box, Stack, HStack, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { LocalsService } from '../../services';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';

const EditLocalForm = ({ local }) => {
  const toast = useToast();
  const setSubmit = async (values, actions) => {
    let editedLocal = {
      number: values.number,
      area: values.area,
      buildingId: local.buildingId,
    };
    let response = await LocalsService.updateLocal(local.id, editedLocal);
    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Zapisano');
    } else {
      ToastError(toast, 'Zmiany nie zostały zapisane');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        number: local.number,
        area: local.area,
      }}
      onSubmit={setSubmit}>
      {({ values, isSubmitting }) => (
        <Form>
          <Flex align="start" justify="center" bg="none">
            <Stack spacing="8" mx="auto" px="6">
              <Box rounded="lg" bg="white" w="md" px="8">
                <Stack spacing="4">
                  <HStack alignItems="end">
                    <BasicInput
                      id="number"
                      name="number"
                      label="Numer mieszkania"
                      defaultValue={values.number}
                      isRequired
                    />
                    <BasicInput
                      id="area"
                      name="area"
                      label="Powierzchnia"
                      type="number"
                      defaultValue={values.area}
                      isRequired
                    />
                  </HStack>
                  <Stack spacing="10">
                    <Button
                      bg="green.300"
                      color="white"
                      _hover={{
                        bg: 'green.400',
                      }}
                      type="submit"
                      isLoading={isSubmitting}>
                      Zapisz zmiany
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
export default EditLocalForm;
