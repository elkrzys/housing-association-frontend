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
import React, { useContext, useEffect } from 'react';
import { ModeContext } from '../../contexts';
import CustomModal from '../CustomModal';
import AddBuildingForm from './AddBuildingForm';
import { MODES } from '../../strings';
import './buildings.css';

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

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const { setMode } = useContext(ModeContext);

  return (
    <Box mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th w="20%" borderRight={'2px dotted gray'}>
                {column.Header}
              </Th>
            ))}
            <Th>
              <Flex justifyContent="center">
                <Button
                  bg="gray.100"
                  _hover={{ bg: 'white' }}
                  onClick={onAddOpen}>
                  Dodaj budynek
                </Button>
                <CustomModal
                  isOpen={isAddOpen}
                  onClose={onAddClose}
                  header={'Dodaj budynek'}>
                  <AddBuildingForm />
                </CustomModal>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {buildings.map(building => (
            <Tr>
              <Td w="20%">{building.street}</Td>
              <Td w="20%">{building.number}</Td>
              <Td w="20%">{building.type}</Td>
              <Td w="20%">{building.numberOfLocals}</Td>
              <Td>
                <Flex maxH="24px" gridColumnGap="10px" justifyContent="center">
                  <Button
                    alignSelf="center"
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}
                    onClick={() =>
                      setMode({
                        mode: MODES.BuildingDetails,
                        contentId: building.id,
                      })
                    }>
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
export default BuildingsTable;
