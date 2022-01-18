import {
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  chakra,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Field } from 'formik';

const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaEye);
const CFaEyeSlash = chakra(FaEyeSlash);

const PasswordInput = props => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={props.name}>
      {({ field }) => (
        <FormControl id={props.id} isRequired={props.isRequired}>
          <FormLabel>{props.label}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CFaLock color="gray.300" />
            </InputLeftElement>
            <Input {...field} type={showPassword ? 'text' : 'password'} />
            <InputRightElement>
              <IconButton
                style={{
                  border: 'none',
                  background: 'transparent',
                  boxShadow: 'none',
                }}
                icon={
                  !showPassword ? (
                    <CFaEye color="gray.300" />
                  ) : (
                    <CFaEyeSlash color="gray.300" />
                  )
                }
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      )}
    </Field>
  );
};
export default PasswordInput;
