import {
    Flex,
    Box,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react';
import { BasicInput, PasswordInput } from '../Inputs';
import { useDisclosure } from "@chakra-ui/hooks"
import { ResetPasswordModal } from '.';
import {Navigate } from 'react-router-dom'

const LoginForm = (props) => {

    const flexBg = useColorModeValue('none', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const {signIn} = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const setSubmit = async (values, actions) =>
    {
        if(await signIn(values.email,values.password)){
            console.log('login successful')
            return <Navigate to="/home" />
        }else{
            console.log('login failed')
        }
        actions.setSubmitting(false);
    }

    
    return(
        <Formik 
        initialValues = {{
            email: '',
            password: ''
        }}
        onSubmit = {setSubmit}
        >
        {(props) => (
            <Form>
                <Flex
                   // minH={'100vh'}
                    align={'start'}
                    justify={'center'}
                    
                    bg={flexBg}
                    >
                    <Stack spacing={8} mx={'auto'} py={6} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'2xl'}>Zaloguj się</Heading>
                    </Stack>
                    <Box rounded={'lg'} bg={boxBg} boxShadow={'lg'} maxW={'md'} p={8} >
                        <Stack spacing={4}>
                        <BasicInput 
                            id='email' 
                            name='email'
                            label='Email' 
                            defaultValue={props.values.email} 
                            type='email' 
                            isRequired
                        />

                        <PasswordInput
                            id='password'
                            name='password'
                            label='Hasło'
                            defaultValue={props.values.password}
                            isRequired
                        />

                        <Stack spacing={10}>
                            <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'flex-end'}>
                            <Link onClick={onOpen} color={'blue.400'}>Nie pamiętasz hasła?</Link>
                            <ResetPasswordModal isOpen={isOpen} onClose={onClose} />
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
            </Form>
         )}
         </Formik>
    )
}
export default LoginForm;