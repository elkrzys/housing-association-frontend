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
  FaUsers,
} from 'react-icons/fa';
import NavItem from './NavItem';
import { MODES } from '../../strings';
import { ModeContext, AuthContext } from '../../contexts';

const CFaUserAlt = chakra(FaUserAlt);

const SidebarContent = () => {
  const { signOut } = useContext(AuthContext);
  let { user } = useContext(AuthContext);
  useEffect(() => {}, [user]);

  const history = useHistory();
  const signOutAndRedirect = () => {
    signOut();
    history.replace('/');
  };
  const { setMode } = useContext(ModeContext);
  return (
    <Flex>
      <Flex p="5%" flexDir="column" w="100%" alignItems={'flex-start'} as="nav">
        <NavItem
          icon={FaHome}
          title="Strona główna"
          onClick={() => setMode({ mode: MODES.HomePage, contentId: null })}
        />
        <NavItem
          icon={FaBuilding}
          title="Budynki"
          onClick={() => setMode({ mode: MODES.Buildings, contentId: null })}
        />
        <NavItem
          icon={FaUsers}
          title="Użytkownicy"
          onClick={() => setMode({ mode: MODES.UsersTables, contentId: null })}
        />
        <NavItem
          icon={FaScroll}
          title="Ogłoszenia"
          onClick={() =>
            setMode({ mode: MODES.Announcements, contentId: null })
          }
        />
        <NavItem icon={FaClipboardCheck} title="Zgłoszenia" />
        <NavItem icon={FaBriefcase} title="Dokumenty" />
        <NavItem
          icon={FaUser}
          title="Twój profil"
          onClick={() => setMode({ mode: MODES.UserProfile, contentId: null })}
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
              {'Pracownik'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SidebarContent;
