import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  useColorModeValue
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AuthContextProvider } from './contexts/AuthContext'
import MainPage from './components/Pages/MainPage'
import Layout from './components/Pages/Layout'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
          <Router >
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/home' element={<Layout />} />
            </Routes>
          </Router> 
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
