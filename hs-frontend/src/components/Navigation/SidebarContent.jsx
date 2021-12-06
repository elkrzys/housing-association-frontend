import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FaBars,
    FaHome,
    FaUser,
    FaBuilding,
    FaBriefcase,
    FaSettings,
    FaScroll,
    FaClipboardCheck,
    FaSignOutAlt
} from 'react-icons/fa'
import NavItem from './NavItem'
import { AuthContext } from '../../contexts/AuthContext'

const SidebarContent = () => {
    const {user, role, signOut} = useContext(AuthContext)
    const history = useHistory();

    const signOutAndRedirect = () =>{
        signOut()
        history.replace("/")
    }

    return(
        <Flex>
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={"flex-start"}
                as="nav"
                >
                
            
                <NavItem  icon={FaHome} title="Strona główna" />
                <NavItem  icon={FaBuilding} title="Budynki" />
                <NavItem  icon={FaScroll} title="Ogłoszenia" />
                <NavItem  icon={FaClipboardCheck} title="Zgłoszenia" />
                <NavItem  icon={FaBriefcase} title="Dokumenty" />
                <NavItem  icon={FaUser} title="Twoje konto" />
                <NavItem  icon={FaSignOutAlt} title="Wyloguj się" onClick={signOutAndRedirect} />
                <Flex mt={'100%'} align="flex-end" w={'100%'}>
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={"flex"}>
                        <Heading as="h3" size="sm">
                            {(user !== null) ? user.firstName && user.lastName : "Unknown user" }
                        </Heading>
                        <Text color="gray">{(role !== null) ? role : "Unknown role"}</Text>
                    </Flex>
                </Flex>
               
            </Flex>
           
    </Flex>
    )
}
export default SidebarContent;