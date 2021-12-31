import React, { useContext, useEffect, useState, useRef } from 'react';
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
import { FaArrowDown, FaArrowUp, FaBan, FaEdit } from 'react-icons/fa';
import { ToastError, ToastSuccess, ToastWarning } from '../Toasts.js';
import { AuthContext } from '../../contexts';
import { DocumentsService } from '../../services';
import CustomModal from '../CustomModal.jsx';
import CustomAlertDialog from '../CustomAlertDialog';
import AddDocumentForm from './AddDocumentForm.jsx';

const OwnedDocumentsTable = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const cancelRef = useRef();

  const getDocuments = async () => {
    const response = await DocumentsService.getByAuthor(user.id);
    if (response.status === 'SUCCESS') {
      setDocuments(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania zgłoszeń');
    }
  };

  const deleteDocument = async id => {
    const response = await DocumentsService.deleteDocument(id);
    if (response.status === 'SUCCESS') {
      await handleRefresh();
      ToastSuccess(toast, 'Usunięto pomyślnie');
    } else {
      ToastError(toast, 'Nie można było usunąć');
    }
  };

  useEffect(() => {
    getDocuments();
  }, [refresh]);

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

  const handleRefresh = async () => {
    await getDocuments();
    setRefresh(!refresh);
  };

  const handleCloseAndRefresh = async () => {
    await handleRefresh();
    onAddClose();
  };

  const columns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Data dodania', accessor: 'created' },
    { Header: 'Termin ważności', accessor: 'removes' },
  ];

  return (
    <Box rounded="lg" mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th
                key={column.accessor}
                borderRight={'2px dotted gray'}
                colSpan={column.accessor === 'author' ? '2' : '0'}
                w={column.accessor === 'id' ? '5%' : 'auto'}>
                {column.Header}
              </Th>
            ))}
            <Th>
              <Flex justifyContent="center">
                <Button
                  w="100%"
                  bg="gray.100"
                  _hover={{ bg: 'white' }}
                  onClick={onAddOpen}>
                  Dodaj
                </Button>
                <CustomModal
                  isOpen={isAddOpen}
                  onClose={onAddClose}
                  header={'Dodaj dokument'}>
                  <AddDocumentForm onClose={handleCloseAndRefresh} />
                </CustomModal>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {documents.map(document => (
            <Tr
              key={document.id}
              onClick={() => {
                //download
              }}
              _hover={{
                boxShadow: '0px 0px 4px 0px rgba(66, 68, 90, 0.52);',
                transition: '0.1s',
                cursor: 'pointer',
              }}>
              <Td w="5%" maxH="20px">
                {document.id}
              </Td>
              <Td w="20%">{document.title}</Td>
              <Td>{new Date(document.created).toLocaleDateString()}</Td>
              <Td>{document.removes}</Td>
              <Td>
                <Button
                  bg="red.100"
                  _hover={{ bg: 'red.200' }}
                  onClick={e => {
                    setSelectedDocumentId(document.id);
                    onAlertOpen();
                    e.stopPropagation();
                  }}>
                  <FaBan />
                  <CustomAlertDialog
                    leastDestructiveRef={cancelRef}
                    onClose={onAlertClose}
                    isOpen={isAlertOpen && selectedDocumentId === document.id}
                    onAction={() => deleteDocument(selectedDocumentId)}
                    actionName={'Usuń'}
                    header={'Usunąć dokument?'}>
                    <p>Tej operacji nie da się cofnąć.</p>
                  </CustomAlertDialog>
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default OwnedDocumentsTable;
