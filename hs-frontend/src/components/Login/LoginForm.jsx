import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputLeftElement,
    InputRightElement,
    InputGroup,
    chakra,
    Stack,
    Link,
    Button,
    IconButton,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Field } from 'formik'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaEye);
const CFaEyeSlash = chakra(FaEyeSlash);

const LoginForm = (props) => {

    const flexBg = useColorModeValue('gray.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPasswordClick = () => {
        console.log("click")
        setShowPassword(!showPassword)
    }

    
    return(
        <form onSubmit={props.handleSubmit} >
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={flexBg}
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Zaloguj się na swoje konto</Heading>
            </Stack>
            <Box
                rounded={'lg'}
                bg={boxBg}
                boxShadow={'lg'}
                p={8}
                >
                <Stack spacing={4}>

                    <Field name="email">
                        {({ field }) => (
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <InputGroup>
                                <InputLeftElement 
                                pointerEvents = 'none'
                                children = { <CFaUserAlt color='gray.300' />}
                                />
                                <Input 
                                {...field} 
                                type="email" 
                                value={props.values.email} 
                                onChange={props.handleChange} />
                                </InputGroup>
                            </FormControl>
                        )}
                    </Field>

                    <Field name="password">
                        {({ field }) => (
                        <FormControl id="password" isRequired>
                            <FormLabel>Hasło</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents = 'none'
                                    children = { <CFaLock color='gray.300' />}
                                    />
                                <Input 
                                {...field} 
                                type={ showPassword ? "text" : "password" }
                                value={props.values.password} 
                                onChange={props.handleChange} />
                                <InputRightElement> 
                                    <IconButton style = {{border: 'none', background: 'transparent', boxShadow: 'none'}}                           
                                    icon={!showPassword ? < CFaEye color='gray.300' /> : < CFaEyeSlash color='gray.300' />} 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        )}
                    </Field>

                <Stack spacing={10}>
                    <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'flex-end'}>
                    <Link color={'blue.400'}>Zapomniałeś hasło?</Link>
                    </Stack>

                    <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    type={'submit'}
                    isLoading={props.isSubmitting}>
                    Zaloguj
                    </Button>
                </Stack>
                </Stack>
            </Box>
            </Stack>
        </Flex>
        </form>
    )
}
export default LoginForm;