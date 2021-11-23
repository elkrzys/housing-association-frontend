import {
    FormControl,
    FormLabel,
    Input,
    InputLeftElement,
    InputGroup,
    chakra,
} from '@chakra-ui/react';
import { FaUserAlt, FaPhone, FaAt } from 'react-icons/fa';
import { Field } from 'formik'

const CFaUserAlt = chakra(FaUserAlt);
const CFaAt = chakra(FaAt);
const CFaPhone = chakra(FaPhone);

const BasicInput = (props) => {

    const leftIcon = (props.type === 'email') ? <CFaAt  color='gray.300' /> :
    (props.type === 'tel') ? <CFaPhone  color='gray.300' /> :
    (props.name.includes('Name')) ? <CFaUserAlt color='gray.300' /> : null;

    return(
        <Field name={props.name}>
                        {({ field }) => (
                            <FormControl id={props.id} isRequired={props.isRequired}>
                                <FormLabel>{props.label}</FormLabel>
                                <InputGroup>
                                {
                                leftIcon !== null && <InputLeftElement pointerEvents = 'none' children = { leftIcon }  />
                                }
                                <Input 
                                {...field} 
                                type={props.type}
                                defaultValue={props.value} 
                                 />
                                </InputGroup>
                            </FormControl>
                        )}
                    </Field>
    )
}
export default BasicInput;