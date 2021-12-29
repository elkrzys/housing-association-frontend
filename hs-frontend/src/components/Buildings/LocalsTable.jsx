import React, { useEffect, useState, useRef, useContext } from 'react';
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
import { LocalsService } from '../../services';
import { ToastError } from '../Toasts';
import AddLocalForm from './AddLocalForm';
import AddLocalByResidentForm from './AddLocalByResidentForm';
import EditLocalForm from './EditLocalForm';
import EditLocalsCellBody from './EditLocalsCellBody';
import { AuthContext } from '../../contexts';

const LocalsTable = ({ buildingId }) => {
  const { role, user } = useContext(AuthContext);
  const [locals, setLocals] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState();

  const cancelRef = useRef();
  const toast = useToast();

  const getLocals = async () => {
    let response;
    if (role !== 'Resident') {
      response = await LocalsService.getAllByBuildingId(buildingId);
    } else {
      response = await LocalsService.getAllByResidentId(user.id);
    }
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

  const reload = async () => {
    await getLocals();
    setRefresh(!refresh);
  };

  return (
    <Box mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {role === 'Resident' && <Th>Adres</Th>}
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
                  {role !== 'Resident' ? (
                    <AddLocalForm buildingId={buildingId} />
                  ) : (
                    <AddLocalByResidentForm />
                  )}
                </CustomModal>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {locals.map(local => (
            <Tr key={local.id}>
              {role === 'Resident' && (
                <Td>{`${local.address.city}, ${local.address.street} ${local.buildingNumber}`}</Td>
              )}
              <Td>{local.number}</Td>
              <Td>
                {local.area} m<sup>2</sup>
              </Td>
              <Td>{local.isFullyOwned ? 'Tak' : 'Nie'}</Td>
              <Td alignItems="end">
                <EditLocalsCellBody
                  selectedLocal={local}
                  buildingId={buildingId}
                  reload={reload}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default LocalsTable;
