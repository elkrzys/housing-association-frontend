import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';

const MultiSelect = ({ label, options, onChange, buttonProps }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (options.length > 0 && options.length < 2) {
    const selOpt = options.slice(0);
    console.log(options);
    //console.log(selOpt);
    // setSelectedOptions(selOpt);
    // console.log(selectedOptions);
  }
  //console.log(options.slice(0));

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            type="button"
            //bg={selectedOptions.length ? 'purple.200' : 'white'}
            color={selectedOptions.length ? 'blue.200' : 'gray.600'}
            borderColor={selectedOptions.length ? 'blue.200' : 'gray.300'}
            borderWidth="1"
            p="2"
            px="4"
            rounded="md"
            _focus={{
              outline: 'none',
            }}
            {...buttonProps}>
            {`${label}${
              selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ''
            }`}
          </MenuButton>
          <MenuList bg="gray.100">
            <MenuGroup>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  onClose();
                }}>
                Wyczyść wybór
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              defaultValue={selectedOptions}
              type="checkbox"
              onChange={values => {
                setSelectedOptions(values.filter(_ => _.length));
                onChange?.(values);
              }}>
              {options.map(option => (
                <MenuItemOption
                  key={`multiselect-menu-${option}`}
                  type="button"
                  value={option}>
                  {option}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default MultiSelect;
