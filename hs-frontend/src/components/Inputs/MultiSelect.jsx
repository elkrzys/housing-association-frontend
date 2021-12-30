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
  preSelectedOptions,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (preSelectedOptions?.length && !isLoaded) {
      setSelectedOptions(preSelectedOptions);
      setIsLoaded(true);
    }
  }, [selectedOptions]);

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
              title={undefined}
              value={selectedOptions}
              type="checkbox"
              onChange={values => {
                //setSelectedOptions(values.filter(_ => _.length));
                setSelectedOptions(values);
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
