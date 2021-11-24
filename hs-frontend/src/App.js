import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  useColorModeValue
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import {LoginForm, RegisterForm, AuthTabs } from './components/Auth';
import RegisterCard from './components/Auth/RegisterForm';
import { AuthContextProvider } from './contexts/AuthContext'
import MainPage from './components/Pages/MainPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
      
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <ColorModeSwitcher m={3} justifySelf="flex-end" />
          <MainPage />
          {/* <AuthTabs/> */}
          {/* <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack> */}
        </Grid>
      </Box>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
