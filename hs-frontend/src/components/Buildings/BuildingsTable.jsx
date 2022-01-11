import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
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
  useToast,
} from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit } from 'react-icons/fa';
import { ModeContext } from '../../contexts';
import CustomModal from '../CustomModal';
import AddBuildingForm from './AddBuildingForm';
import { MODES } from '../../strings';
import './buildings.css';
import { BuildingsService } from '../../services';
import { ToastError } from '../Toasts';
import CustomAlertDialog from '../CustomAlertDialog';

const BuildingsTable = () => {
  const cancelRef = useRef();
  const toast = useToast();
  const history = useHistory();
  const { setMode } = useContext(ModeContext);
  const [buildings, setBuildings] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const columns = [
    { Header: 'Miasto', accessor: 'city' },
    { Header: 'Dzielnica', accessor: 'district' },
    { Header: 'Ulica', accessor: 'street' },
    { Header: 'Numer', accessor: 'number' },
    { Header: 'Typ budynku', accessor: 'type' },
    { Header: 'Liczba lokali', accessor: 'numberOfLocals', isNumeric: true },
  ];

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const getBuildings = async () => {
    let response = await BuildingsService.getBuildings();
    if (response.status === 'SUCCESS') {
      setBuildings(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania budynków');
    }
  };

  const deleteBuilding = async id => {
    let response = await BuildingsService.deleteBuilding(id);
    if (response.status === 'SUCCESS') {
      await getBuildings();
      setRefresh(!refresh);
    } else {
      ToastError(toast, 'Wystąpił problem podczas usuwania budynku');
    }
  };

  useEffect(() => {
    getBuildings();
  }, [refresh]);

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
                  onClose={() => {
                    setRefresh(!refresh);
                    onAddClose();
                  }}
                  header={'Dodaj budynek'}>
                  <AddBuildingForm />
                </CustomModal>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {buildings.map(building => (
            <Tr key={building.id}>
              <Td>{building.address.city}</Td>
              <Td>{building.address.district || '-'}</Td>
              <Td>{building.address.street}</Td>
              <Td>{building.number}</Td>
              <Td>{building.type === 'Block' ? 'Blok' : 'Dom'}</Td>
              <Td>{building.numberOfLocals}</Td>
              <Td>
                <Flex maxH="24px" gridColumnGap="10px" justifyContent="center">
                  <Button
                    alignSelf="center"
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}
                    onClick={() => {
                      history.push(`/building/${building.id}`);
                      // setMode({
                      //   mode: MODES.BuildingDetails,
                      //   contentId: building.id,
                      // });
                    }}>
                    <FaEdit />
                  </Button>
                  <Button
                    alignSelf="center"
                    bg="red.100"
                    _hover={{ bg: 'red.200' }}
                    onClick={e => {
                      onAlertOpen();
                    }}>
                    <FaTrash />
                    <CustomAlertDialog
                      leastDestructiveRef={cancelRef}
                      onClose={onAlertClose}
                      isOpen={isAlertOpen}
                      onAction={async () => await deleteBuilding(building.id)}
                      actionName={'Usuń'}
                      header={'Usunąć budynek i powiązane lokale?'}>
                      <p>Tej operacji nie da się cofnąć.</p>
                    </CustomAlertDialog>
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
