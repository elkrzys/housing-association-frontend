import React, { useContext, useEffect } from 'react';
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
  FaUsers,
} from 'react-icons/fa';
import NavItem from './NavItem';
import { MODES } from '../../strings';
import { ModeContext, AuthContext } from '../../contexts';

const CFaUserAlt = chakra(FaUserAlt);

const SidebarContent = () => {
  const { signOut, role } = useContext(AuthContext);
  let { user } = useContext(AuthContext);
  const { setMode } = useContext(ModeContext);

  useEffect(() => {}, [user]);

  const history = useHistory();
  const signOutAndRedirect = () => {
    signOut();
    history.replace('/login');
  };
  return (
    <Flex>
      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
        {role === 'Worker' ? (
          <NavItem
            icon={FaBuilding}
            title="Budynki"
            // onClick={() => setMode({ mode: MODES.Buildings, contentId: null })}
            onClick={() => history.push('/buildings')}
          />
        ) : (
          <NavItem
            icon={FaBuilding}
            title="Lokale"
            onClick={() => history.push('/locals')}
            // onClick={() =>
            //   setMode({ mode: MODES.ResidentLocals, contentId: null })
            // }
          />
        )}
        {role === 'Worker' && (
          <NavItem
            icon={FaUsers}
            title="Użytkownicy"
            //onClick={() => setMode({ mode: MODES.UsersTables, contentId: null })}
            onClick={() => history.push('/users')}
          />
        )}

        <NavItem
          icon={FaScroll}
          title="Ogłoszenia"
          // onClick={() =>
          //   setMode({ mode: MODES.Announcements, contentId: null })
          // }
          onClick={() => history.push('/announcements')}
        />
        <NavItem
          icon={FaClipboardCheck}
          title="Zgłoszenia"
          // onClick={() => setMode({ mode: MODES.Issues, contentId: null })}
          onClick={() => history.push('/issues')}
        />
        <NavItem
          icon={FaBriefcase}
          title="Dokumenty"
          // onClick={() => setMode({ mode: MODES.Documents, contentId: null })}
          onClick={() => history.push('/documents')}
        />
        <NavItem
          icon={FaUser}
          title="Twój profil"
          // onClick={() => setMode({ mode: MODES.UserProfile, contentId: null })}
          onClick={() => history.push('/profile')}
        />
        <NavItem
          icon={FaSignOutAlt}
          title="Wyloguj"
          onClick={signOutAndRedirect}
        />
        <Flex mt="100%" align="flex-end" w="100%">
          <Avatar size="sm" icon={<CFaUserAlt color="white" />} />
          <Flex flexDir="column" ml="4">
            <Heading as="h1" fontSize="sm">
              {user?.firstName + ' ' + user?.lastName}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {role === 'Worker' ? 'Pracownik' : 'Mieszkaniec'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SidebarContent;
