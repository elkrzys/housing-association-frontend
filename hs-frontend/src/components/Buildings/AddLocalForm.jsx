import { useState } from 'react';
import {
  Flex,
  Box,
  Stack,
  HStack,
  Button,
  Heading,
  Radio,
  RadioGroup,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { LocalsService } from '../../services';
import { BasicInput } from '../Inputs';
import { ToastError, ToastSuccess } from '../Toasts';

const AddLocalForm = ({ buildingId }) => {
  const toast = useToast();
  const setSubmit = async (values, actions) => {
    let local = { number: values.number, area: values.area };
    let response = await LocalsService.addLocalToBuilding(buildingId, local);
    if (response.status === 'SUCCESS') {
      actions.resetForm({
        values: {
          number: '',
          area: '',
        },
      });
      ToastSuccess(toast, 'Lokal dodany');
    } else {
      ToastError(toast, 'Lokal nie został dodany');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        number: '',
        area: '',
      }}
      onSubmit={setSubmit}>
      {({ values, isSubmitting }) => (
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
                  <HStack alignItems="end">
                    <BasicInput
                      id="number"
                      name="number"
                      label="Numer mieszkania"
                      placeholder="Np. 10"
                      defaultValue={values.number}
                      isRequired
                    />
                    <BasicInput
                      id="area"
                      name="area"
                      label="Powierzchnia"
                      placeholder="Np. 45.5"
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
export default AddLocalForm;
