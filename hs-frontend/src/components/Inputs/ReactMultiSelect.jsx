import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

export const ReactMultiSelect = ({ options, isMulti, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const onChange = option => {
    setFieldValue(
      field.name,
      isMulti ? option.map(item => item.value) : option.value,
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      openMenuOnClick={false}
      placeholder="Wyszukaj..."
    />
  );
};
export default ReactMultiSelect;
