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

const ReceivedDocumentsTable = () => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getDocuments = async () => {
    const response = await DocumentsService.getByReceiver(user.id);
    if (response.status === 'SUCCESS') {
      setDocuments(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania zgłoszeń');
    }
  };

  useEffect(() => {
    getDocuments();
  }, [refresh]);

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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default ReceivedDocumentsTable;
