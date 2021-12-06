import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  useColorModeValue
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AuthContextProvider } from './contexts/AuthContext'
import AuthPage from './components/Pages/AuthPage'
import MainPage from './components/Pages/MainPage'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Router>
          <Switch >
              <Route exact path='/'>
                <AuthPage />
              </Route>
              <Route path='/home'>
                <MainPage />
              </Route>
          </Switch> 
        </Router>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
