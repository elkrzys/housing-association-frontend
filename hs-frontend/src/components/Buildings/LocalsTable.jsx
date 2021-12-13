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
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit } from 'react-icons/fa';
import React, { useMemo } from 'react';
import CustomModal from '../CustomModal';
import AddBuildingForm from './AddBuildingForm';

const LocalsTable = () => {
  const locals = [
    {
      id: 1,
      area: 46.5,
      isOwned: false,
      number: 1,
    },
    {
      id: 2,
      area: 46.5,
      isOwned: false,
      number: 2,
    },
    {
      id: 3,
      area: 64.5,
      isOwned: true,
      number: 3,
    },
    {
      id: 4,
      area: 64.5,
      isOwned: false,
      number: 4,
    },
  ];

  const columns = [
    {
      Header: 'Numer',
      accessor: 'number',
    },
    {
      Header: 'Powierzchnia',
      accessor: 'area',
    },
    {
      Header: 'Własnościowe',
      accessor: 'isOwned',
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th>{column.Header}</Th>
            ))}

            <Th colSpan={2}>
              <Flex justifyContent="center">
                <Button bg="gray.100" _hover={{ bg: 'white' }} onClick={onOpen}>
                  Dodaj lokal
                </Button>
                <CustomModal
                  isOpen={isOpen}
                  onClose={onClose}
                  header={'Dodaj lokal'}>
                  <AddBuildingForm />
                </CustomModal>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {locals.map(local => (
            <Tr>
              <Td>{local.number}</Td>
              <Td>{local.area}</Td>
              <Td>{local.isOwned ? 'Tak' : 'Nie'}</Td>
              <Td alignItems="end">
                <Flex maxH="24px" gridColumnGap="10px" justifyContent="center">
                  <Button
                    alignSelf="center"
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}>
                    <FaEdit />
                  </Button>
                  <Button
                    alignSelf="center"
                    bg="red.100"
                    _hover={{ bg: 'red.200' }}>
                    <FaTrash />
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
export default LocalsTable;
