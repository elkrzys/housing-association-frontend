import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp, FaBan, FaEdit } from 'react-icons/fa';
import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from '../../contexts';
import CustomModal from '../CustomModal.jsx';
import { MODES } from '../../strings';
import { UsersService } from '../../services';

const UsersTable = ({ usersRole }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await UsersService.getUsersByRole(usersRole);
    if (response.status === 'SUCCESS') {
      setUsers(response.data);
    } else {
      console.log('failure during users fething');
      return null;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { Header: 'Imię', accessor: 'firstName' },
    { Header: 'Nazwisko', accessor: 'lastName' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Telefon', accessor: 'phoneNumber' },
    { Header: 'Aktywny', accessor: 'isEnabled' },
  ];

  return (
    <Box w="full">
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th key={column.accessor} w="20%" borderRight={'2px dotted gray'}>
                {column.Header}
              </Th>
            ))}

            <Th>
              {usersRole !== 'residents' && (
                <Flex justifyContent="center">
                  <Button
                    bg="gray.100"
                    _hover={{ bg: 'white' }}
                    //onClick={onAddOpen}
                  >
                    Dodaj
                  </Button>
                </Flex>
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map(user => (
            <Tr
              key={user.id}
              //   onClick={() => {
              //     onDisplayOpen();
              //   }}
              _hover={{
                boxShadow: '0px 0px 4px 0px rgba(66, 68, 90, 0.52);',
                transition: '0.1s',
                cursor: 'pointer',
              }}>
              <Td w="20%">{user.firstName}</Td>
              <Td w="20%">{user.lastName}</Td>
              <Td w="20%">{user.email}</Td>
              <Td w="20%">{user.phoneNumber}</Td>
              <Td w="20%">{user.isEnabled ? 'Aktywny' : 'Nieaktywny'}</Td>
              <Td>
                <Flex justifyContent="center">
                  <Button
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}
                    onClick={e => {
                      e.stopPropagation();
                      //   setMode({
                      //     mode: MODES.EditAnnouncement,
                      //     contentId: announcement.id,
                      //   });
                    }}>
                    <FaEdit />
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default UsersTable;
