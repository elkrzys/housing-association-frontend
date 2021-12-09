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
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import React, { useMemo } from 'react';
import Modal from '../Modal';
import AddBuildingForm from './AddBuildingForm';

const BuildingsTable = () => {
  const buildings = [
    {
      id: 1,
      type: 'Blok',
      numberOfLocals: 10,
      street: 'Opolska',
      number: 10,
    },
    {
      id: 2,
      type: 'Blok',
      numberOfLocals: 12,
      street: 'Opolska',
      number: 12,
    },
    {
      id: 3,
      type: 'Blok',
      numberOfLocals: 12,
      street: 'Opolska',
      number: 14,
    },
    {
      id: 4,
      type: 'Blok',
      numberOfLocals: 10,
      street: 'Opolska',
      number: 24,
    },
    {
      id: 5,
      type: 'Blok',
      numberOfLocals: 10,
      street: 'Opolska',
      number: 26,
    },
    {
      id: 6,
      type: 'Blok',
      numberOfLocals: 12,
      street: 'Katowicka',
      number: 4,
    },
    {
      id: 7,
      type: 'Blok',
      numberOfLocals: 10,
      street: 'Opolska',
      number: 102,
    },
  ];

  const columns = [
    {
      Header: 'Ulica',
      accessor: 'street',
    },
    {
      Header: 'Numer',
      accessor: 'number',
    },
    {
      Header: 'Typ budynku',
      accessor: 'type',
    },
    {
      Header: 'Liczba lokali',
      accessor: 'numberOfLocals',
      isNumeric: true,
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mx={{ base: '0', md: '5%' }}>
      <Flex w="100%" pb="5" px="10" justifyContent="end">
        <Button
          style={{
            border: '1px solid #fefcbf',
            boxShadow: '0 0 1em #fefcbf',
            borderRadius: '5px',
          }}
          bg="transparent"
          _hover={{ bg: 'yellow.100' }}
          onClick={onOpen}>
          Dodaj budynek
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          bodyContent={<AddBuildingForm />}
          header={'Dodaj budynek'}
        />
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="yellow.100">
            {columns.map(column => (
              <Th>{column.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {buildings.map(building => (
            <Tr>
              <Td>{building.street}</Td>
              <Td>{building.number}</Td>
              <Td>{building.type}</Td>
              <Td>{building.numberOfLocals}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default BuildingsTable;
