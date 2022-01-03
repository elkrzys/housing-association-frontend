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
import { BuildingsService } from '../../services';
import { BasicInput } from '../Inputs';
import { ToastSuccess, ToastError } from '../Toasts';

const AddBuildingForm = () => {
  const toast = useToast();

  const setSubmit = async (values, actions) => {
    let response = await BuildingsService.addBuilding(
      values.city,
      values.district,
      values.street,
      values.number,
      values.type,
    );
    if (response.status === 'SUCCESS') {
      actions.resetForm({
        values: {
          city: '',
          district: null,
          street: '',
          number: '',
          type: 'block',
        },
      });
      ToastSuccess(toast, 'Budynek dodany');
    } else {
      ToastError(toast, 'Budynek nie został dodany');
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        city: '',
        district: null,
        street: '',
        number: '',
        type: 'block',
      }}
      onSubmit={setSubmit}>
      {({ values, setFieldValue, isSubmitting }) => (
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
                  <Stack align="left">
                    <Heading fontSize="md">Adres</Heading>
                  </Stack>
                  <HStack alignItems="end">
                    <BasicInput
                      id="city"
                      name="city"
                      placeholder="Miasto"
                      defaultValue={values.city}
                      isRequired
                    />
                    <BasicInput
                      id="district"
                      name="district"
                      placeholder="Dzielnica"
                      defaultValue={values.district}
                    />
                  </HStack>
                  <BasicInput
                    id="street"
                    name="street"
                    placeholder="Ulica"
                    defaultValue={values.street}
                    isRequired
                  />
                  <BasicInput
                    id="number"
                    name="number"
                    label="Numer budynku"
                    defaultValue={values.number}
                    isRequired
                  />
                  <RadioGroup defaultValue={values.type} id="type" name="type">
                    <Stack direction="row">
                      <Radio
                        onChange={() => setFieldValue('type', 'block')}
                        value="block">
                        Blok
                      </Radio>
                      <Radio
                        onChange={() => setFieldValue('type', 'house')}
                        value="house">
                        Dom
                      </Radio>
                    </Stack>
                  </RadioGroup>
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
export default AddBuildingForm;
