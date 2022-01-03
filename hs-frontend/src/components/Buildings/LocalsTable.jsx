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
  Text,
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

const LocalsTable = ({ buildingId, residentId }) => {
  const { role, user } = useContext(AuthContext);
  const [locals, setLocals] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState();

  const cancelRef = useRef();
  const toast = useToast();

  const getLocals = async () => {
    let response;
    if (role !== 'Resident' && buildingId) {
      response = await LocalsService.getAllByBuildingId(buildingId);
    } else if (role !== 'Resident' && residentId) {
      response = await LocalsService.getAllByResidentId(residentId);
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
    if (user.role === 'Resident' || residentId) setShowAddress(true);
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
      <Text
        fontSize={{ base: '16px', lg: '18px' }}
        color="green.600"
        fontWeight={'500'}
        textTransform={'uppercase'}
        mb={'4'}>
        Lokale
      </Text>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {showAddress && <Th>Adres</Th>}
            {columns.map(column => (
              <Th>{column.Header}</Th>
            ))}
            {!residentId && (
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
            )}
          </Tr>
        </Thead>
        <Tbody>
          {locals.map(local => (
            <Tr key={local.id}>
              {showAddress && (
                <Td>{`${local.address.city}, ${local.address.street} ${local.buildingNumber}`}</Td>
              )}
              <Td>{local.number}</Td>
              <Td>
                {local.area} m<sup>2</sup>
              </Td>
              <Td>{local.isFullyOwned ? 'Tak' : 'Nie'}</Td>
              {!residentId && (
                <Td alignItems="end">
                  <EditLocalsCellBody
                    selectedLocal={local}
                    buildingId={buildingId}
                    reload={reload}
                  />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default LocalsTable;
