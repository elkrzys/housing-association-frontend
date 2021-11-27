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
import { AuthContextProvider } from './contexts/AuthContext'
import MainPage from './components/Pages/MainPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
          <MainPage />      
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
