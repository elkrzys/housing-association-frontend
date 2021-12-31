import { Box, Button } from '@chakra-ui/react';
import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField, useFormikContext } from 'formik';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl);

const CustomInput = forwardRef(({ value, onClick, w }, ref) => (
  <Button
    w={w}
    bg="none"
    border={'2px solid'}
    borderColor="blue.100"
    rounded="md"
    // bg="cyan.100"
    _hover={{ bg: 'blue.100' }}
    _active={{ bg: 'blue.100' }}
    onClick={onClick}
    ref={ref}>
    {value}
  </Button>
));

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  //const [startDate, setDate] = useState(props.selectedDate);

  const selectDateHandler = date => {
    //setDate(date);
    setFieldValue(field.name, date);
  };
  const today = new Date();

  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat="dd-MM-yyyy"
      selected={(field.value && new Date(field.value)) || null}
      onChange={selectDateHandler}
      minDate={today}
      todayButton={'Dzisiaj'}
      locale="pl"
      customInput={<CustomInput w={props.w} />}
    />
  );
};
export default DatePickerField;
