import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  chakra,
} from '@chakra-ui/react';
import {
  FaBars,
  FaHome,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaSettings,
  FaUserAlt,
  FaScroll,
  FaClipboardCheck,
  FaSignOutAlt,
} from 'react-icons/fa';
import NavItem from './NavItem';
import { MODES } from '../../strings';
import { ModeContext, AuthContext } from '../../contexts';

const CFaUserAlt = chakra(FaUserAlt);

const SidebarContent = () => {
  const { role, signOut } = useContext(AuthContext);
  let { user } = useContext(AuthContext);
  useEffect(() => {}, [user]);

  const history = useHistory();

  const signOutAndRedirect = () => {
    signOut();
    history.replace('/');
  };

  const getRole = () => {
    switch (role) {
      case 'Resident':
        return 'Mieszkaniec';
      case 'Worker':
        return 'Pracownik';
      case 'Admin':
        return 'Admin';
      default:
        return 'Undefined Role';
    }
  };

  const { setMode } = useContext(ModeContext);
  return (
    <Flex>
      <Flex p="5%" flexDir="column" w="100%" alignItems={'flex-start'} as="nav">
        <NavItem icon={FaHome} title="Strona główna" />
        <NavItem icon={FaBuilding} title="Budynki" />
        <NavItem icon={FaScroll} title="Ogłoszenia" />
        <NavItem icon={FaClipboardCheck} title="Zgłoszenia" />
        <NavItem icon={FaBriefcase} title="Dokumenty" />
        <NavItem
          icon={FaUser}
          title="Twój profil"
          onClick={() => setMode(MODES.UserProfile)}
        />
        <NavItem
          icon={FaSignOutAlt}
          title="Wyloguj"
          onClick={signOutAndRedirect}
        />
        <Flex mt={'100%'} align="flex-end" w={'100%'}>
          <Avatar size="sm" icon={<CFaUserAlt color="white" />} />
          <Flex flexDir="column" ml={4}>
            <Heading as="h1" fontSize="sm">
              {user !== null
                ? user.firstName + ' ' + user.lastName
                : 'Unknown user'}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {getRole()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SidebarContent;
