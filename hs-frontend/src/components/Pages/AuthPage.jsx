import {
  Stack,
  Flex,
  Box,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import background from '../../assets/images/park-background.jpg';
import { AuthTabs } from '../Auth';
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const AuthPage = () => {
  const { user, signOut } = useContext(AuthContext);

  const Hello = () => {
    return (
      <Box>
        <p>Hello, {user.firstName}</p>
        <button onClick={signOut}>Wyloguj</button>
      </Box>
    );
  };

  return (
    <Flex
      minH={'100vh'}
      backgroundImage={`url(${background})`}
      direction={'column'}
      backgroundSize={'cover'}
      backgroundPosition={'start center'}
    >
      <Box
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        w={'full'}
        h={'full'}
        py={10}
        align={'center'}
      >
        {/* <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
              
          {/* <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>   */}

        {/* </Stack> */}

        {/* </VStack> */}
        <Text
          maxW={'30vw'}
          color={'white'}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '2x1', md: '4xl' })}
        >
          System zgłoszeń wspólnoty mieszkaniowej
        </Text>
        <Box w={'40vw'} pt={10}>
          {user ? <Redirect to="/home" /> : <AuthTabs />}
        </Box>
      </Box>
    </Flex>
  );
};
export default AuthPage;
