import { useEffect, useState } from 'react';
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

const MultiSelect = ({
  label,
  onChange,
  buttonProps,
  options = null,
  complexOptions = null,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {}, [selectedOptions]);

  // useEffect(() => {
  //   if (options?.length > 0 && options?.length < 2) {
  //     setSelectedOptions(options.slice(0));
  //   }
  //   if (complexOptions?.length > 0 && complexOptions?.length < 2) {
  //     setSelectedOptions(complexOptions.slice(0));
  //   }
  // }, []);

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
                  console.log(selectedOptions);
                }}>
                Wyczyść wybór
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={undefined}
              value={selectedOptions}
              type="checkbox"
              onChange={values => {
                setSelectedOptions(values.filter(_ => _.length));
                onChange?.(values);
              }}>
              {complexOptions !== null
                ? complexOptions.map(option => (
                    <MenuItemOption
                      _hover={{ background: 'blue.100' }}
                      key={`multiselect-menu-${option.id}`}
                      type="button"
                      value={option.id}>
                      {option.name}
                    </MenuItemOption>
                  ))
                : options.map(option => (
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
