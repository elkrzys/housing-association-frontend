import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Text, Avatar, Heading, chakra } from '@chakra-ui/react';
import {
  FaUser,
  FaBuilding,
  FaBriefcase,
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
          icon={FaScroll}
          title="Ogłoszenia"
          onClick={() =>
            setMode({ mode: MODES.Announcements, contentId: null })
          }
        />
        <NavItem
          icon={FaClipboardCheck}
          title="Zgłoszenia"
          onClick={() => setMode({ mode: MODES.Issues, contentId: null })}
        />
        <NavItem
          icon={FaBuilding}
          title="Lokale"
          onClick={() =>
            setMode({ mode: MODES.ResidentLocals, contentId: null })
          }
        />
        <NavItem
          icon={FaBriefcase}
          title="Dokumenty"
          onClick={() => setMode({ mode: MODES.Documents, contentId: null })}
        />
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
              {'Mieszkaniec'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SidebarContent;
