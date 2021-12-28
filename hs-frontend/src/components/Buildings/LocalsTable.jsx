import React, { useEffect, useState, useRef } from 'react';
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
import CustomModal from '../CustomModal';
import CustomAlertDialog from '../CustomAlertDialog';
import AddBuildingForm from './AddLocalForm';
import { LocalsService } from '../../services';
import { ToastError } from '../Toasts';
import AddLocalForm from './AddLocalForm';
import EditLocalForm from './EditLocalForm';

const LocalsTable = ({ buildingId }) => {
  const [locals, setLocals] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState();

  const {
    onOpen: onAlertOpen,
    onClose: onAlertClose,
    isOpen: isAlertOpen,
  } = useDisclosure();

  const deleteLocal = async localId => {
    const response = await LocalsService.deleteLocal(localId);
    if (response.status !== 'SUCCESS') {
      ToastError(toast, 'Usuwanie nieudane');
    }
    setRefresh(!refresh);
  };

  const cancelRef = useRef();
  const toast = useToast();
  const getLocals = async () => {
    const response = await LocalsService.getAllByBuildingId(buildingId);
    if (response.status === 'SUCCESS') {
      setLocals(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania lokali');
    }
  };

  useEffect(() => {
    getLocals();
  }, [refresh]);

  const columns = [
    { Header: 'Numer', accessor: 'number' },
    { Header: 'Powierzchnia', accessor: 'area' },
    { Header: 'Własnościowe', accessor: 'isOwned' },
  ];

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const reload = () => {
    getLocals();
    setRefresh(!refresh);
  };

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
                <Button
                  bg="gray.100"
                  _hover={{ bg: 'white' }}
                  onClick={onAddOpen}>
                  Dodaj lokal
                </Button>
                <CustomModal
                  isOpen={isAddOpen}
                  onClose={() => {
                    onAddClose();
                    reload();
                  }}
                  header={'Dodaj lokal'}>
                  <AddLocalForm buildingId={buildingId} />
                </CustomModal>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {locals.map(local => (
            <Tr key={local.id}>
              <Td>{local.number}</Td>
              <Td>
                {local.area} m<sup>2</sup>
              </Td>
              <Td>{local.isFullyOwned ? 'Tak' : 'Nie'}</Td>
              <Td alignItems="end">
                <Flex maxH="24px" gridColumnGap="10px" justifyContent="center">
                  <Button
                    alignSelf="center"
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}
                    onClick={() => {
                      onEditOpen();
                      setSelectedLocal(local);
                    }}>
                    <FaEdit />
                    <CustomModal
                      header="Edytuj lokal"
                      size="md"
                      onClose={() => {
                        onEditClose();
                        reload();
                      }}
                      isOpen={isEditOpen}>
                      <EditLocalForm local={selectedLocal} />
                    </CustomModal>
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
                      onClose={() => {
                        onAlertClose();
                        reload();
                      }}
                      isOpen={isAlertOpen}
                      onAction={async () => await deleteLocal(local.id)}
                      actionName={'Usuń'}
                      header={'Usunąć lokal?'}>
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
export default LocalsTable;
