import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue } from "@chakra-ui/react";
import { LoginForm, RegisterForm } from ".";

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
            <Tabs rounded={'lg'} isFitted variant="enclosed" bg={boxBg}>
                <TabList >
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
       // </Box>
    )
}
export default AuthTabs;