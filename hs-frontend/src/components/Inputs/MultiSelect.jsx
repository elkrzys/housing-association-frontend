import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (options.length > 0 && options.length < 2) {
      setSelectedOptions(options.slice(0));
    }
  }, []);

  //console.log(options.slice(0));

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            type="button"
            color={selectedOptions.length ? 'blue.600' : 'gray.600'}
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
                  _hover={{ background: 'blue.100' }}
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
