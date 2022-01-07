import {
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  chakra,
} from '@chakra-ui/react';
import { FaUserAlt, FaPhone, FaAt } from 'react-icons/fa';
import { Field } from 'formik';

const CFaUserAlt = chakra(FaUserAlt);
const CFaAt = chakra(FaAt);
const CFaPhone = chakra(FaPhone);

const BasicInput = ({
  name,
  id,
  isRequired,
  isDisabled,
  label,
  type,
  placeholder,
  validationMessage,
}) => {
  let leftIcon = null;
  if (type === null) type = 'text';
  switch ({ type }) {
    case 'email':
      leftIcon = <CFaAt color="gray.300" />;
      break;
    case 'tel':
      leftIcon = <CFaPhone color="gray.300" />;
      break;
    default:
      leftIcon = name.includes('Name') ? <CFaUserAlt color="gray.300" /> : null;
      break;
  }

  return (
    <Field name={name}>
      {({ field }) => (
        <FormControl id={id} isRequired={isRequired} isDisabled={isDisabled}>
          <FormLabel>{label}</FormLabel>
          <InputGroup>
            {leftIcon !== null && (
              <InputLeftElement pointerEvents="none">
                {leftIcon}
              </InputLeftElement>
            )}
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              // defaultValue={props.defaultValue}
            />
          </InputGroup>
        </FormControl>
      )}
    </Field>
  );
};
export default BasicInput;
