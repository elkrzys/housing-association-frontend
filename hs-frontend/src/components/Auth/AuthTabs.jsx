import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthTabs = () => {
  const boxBg = useColorModeValue('white', 'gray.700');
  return (
    // <Box
    //     //minH={'100vh'}
    //     align={'center'}
    //     justify={'center'}
    //     width={'50%'}
    //     mx={'auto'}
    // >
    <Box w="100%">
      <Tabs rounded="lg" isFitted variant="enclosed" bg={boxBg}>
        <TabList>
          <Tab>Zaloguj</Tab>
          <Tab>Zarejestruj</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    // </Box>
  );
};
export default AuthTabs;
