import { Flex, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import background from '../../assets/images/city_bg.jpg';
import { AuthTabs } from '../Auth';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const AuthPage = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  return (
    <Flex
      minH="100vh"
      backgroundImage={`url(${background})`}
      backgroundAttachment="fixed"
      direction="column"
      backgroundSize="cover"
      backgroundPosition="start center">
      <Box
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        w="full"
        h="full"
        py="10"
        align="center">
        <Text
          maxW={{ base: '30vw', md: '80vw' }}
          color="white"
          fontWeight="700"
          lineHeight="1.2"
          fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }}>
          System zgłoszeń wspólnoty mieszkaniowej
        </Text>
        <Box w={{ base: '80vw', md: '60vw', lg: '40vw' }} pt="10">
          {user ? history.replace('/') : <AuthTabs />}
        </Box>
      </Box>
    </Flex>
  );
};
export default AuthPage;
