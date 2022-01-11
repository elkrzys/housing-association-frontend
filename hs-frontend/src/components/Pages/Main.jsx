import { useState, useContext, useEffect, useCallback } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import { MODES } from '../../strings';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext, ModeContext } from '../../contexts';
import Modes from '../Modes/Modes';
import MainLayout from './MainLayout';

const Main = () => {
  return (
    <MainLayout header="Strona główna">
      <Redirect to="/announcements" />
    </MainLayout>
  );
};
export default Main;
