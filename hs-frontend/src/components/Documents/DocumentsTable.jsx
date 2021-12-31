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
import CustomModal from '../CustomModal.jsx';
import { ToastError, ToastSuccess, ToastWarning } from '../Toasts.js';
import { AuthContext } from '../../contexts';
import Issue from './Issue';
import { DocumentsService } from '../../services';
import EditCellBody from './EditCellBody.jsx';

const DocumentsTable = () => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();
  const [documentsByAuthor, setDocumentsByAuthor] = useState([]);
  const [documentsByReceiver, setDocumentsByReceiver] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = async () => {
    await getDocuments();
    setRefresh(!refresh);
  };

  const getDocuments = async () => {
    if (role === 'Resident') {
      const authorResponse = await DocumentsService.getByAuthor(user.id);
      const receiverResponse = await DocumentsService.getByReceiver(user.id);
      if (
        authorResponse.status === 'SUCCESS' &&
        receiverResponse.status === 'SUCCESS'
      ) {
        setDocumentsByAuthor(authorResponse.data);
        setDocumentsByReceiver(receiverResponse.data);
      } else {
        ToastError(toast, 'Wystąpił problem podczas wczytywania zgłoszeń');
      }
    } else {
      const allDocsResponse = await DocumentsService.getAll();
      if (allDocsResponse.status === 'SUCCESS') {
        setAllDocuments(response.data);
      } else {
        ToastError(toast, 'Wystąpił problem podczas wczytywania zgłoszeń');
      }
    }
  };

  useEffect(() => {
    getDocuments();
  }, [refresh]);

  // const {
  //   isOpen: isAddOpen,
  //   onOpen: onAddOpen,
  //   onClose: onAddClose,
  // } = useDisclosure();

  // const {
  //   isOpen: isDisplayOpen,
  //   onOpen: onDisplayOpen,
  //   onClose: onDisplayClose,
  // } = useDisclosure();

  const defColumns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Data dodania', accessor: 'created' },
    { Header: 'Termin ważności', accessor: 'removes' },
    { Header: 'Autor', accessor: 'author' },
  ];

  let columns = [];
  if (role === 'Resident')
    columns = defColumns.filter(column => column.accessor !== 'author');
  else {
    columns = defColumns;
  }

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

            {role === 'Resident' && (
              <Th>
                <Flex justifyContent="center">
                  <Button
                    bg="gray.100"
                    _hover={{ bg: 'white' }}
                    onClick={() => {
                      locals.length
                        ? onAddOpen()
                        : ToastWarning(
                            toast,
                            'Nie możesz dodać zgłoszenia nie mając mieszkania',
                            3000,
                          );
                    }}>
                    Dodaj
                  </Button>
                  <CustomModal
                    isOpen={isAddOpen}
                    onClose={onAddClose}
                    header={'Dodaj zgłoszenie'}>
                    <AddIssueForm
                      locals={locals}
                      onAddClose={() => {
                        handleRefresh();
                        onAddClose();
                      }}
                    />
                  </CustomModal>
                </Flex>
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {issues.map(issue => (
            <Tr
              key={issue.id}
              onClick={() => {
                setSelectedIssue(issue);
                onDisplayOpen();
              }}
              _hover={{
                boxShadow: '0px 0px 4px 0px rgba(66, 68, 90, 0.52);',
                transition: '0.1s',
                cursor: 'pointer',
              }}>
              <CustomModal
                size="lg"
                onClose={onDisplayClose}
                isOpen={isDisplayOpen}
                footerContent={
                  role !== 'Resident' &&
                  !selectedIssue?.resolved && (
                    <Button
                      colorScheme="green"
                      onClick={async () => {
                        await resolveIssue(selectedIssue.id);
                        await handleRefresh();
                      }}>
                      Zatwierdź sprawę
                    </Button>
                  )
                }>
                <Issue
                  title={selectedIssue?.title}
                  content={selectedIssue?.content}
                  author={selectedIssue?.author}
                  date={selectedIssue?.created}
                  resolved={selectedIssue?.resolved}
                />
              </CustomModal>
              <Td w="5%">{issue.id}</Td>
              <Td w="20%">{`${issue.address?.city} ${issue.address?.street} ${issue.sourceBuildingId}/${issue.sourceLocalId}`}</Td>
              <Td w="20%">{issue.title}</Td>
              <Td>{new Date(issue.created).toLocaleDateString()}</Td>
              <Td>
                {issue.resolved !== null
                  ? `Zamknięte: ${new Date(
                      issue.resolved,
                    ).toLocaleDateString()}`
                  : 'W trakcie'}
              </Td>
              {role !== 'Resident' && (
                <Td w="20%">{`${issue.author.firstName} ${issue.author.lastName}`}</Td>
              )}
              {role === 'Resident' && (
                <Td>
                  {!issue.resolved && (
                    <EditCellBody
                      selectedIssue={issue}
                      locals={locals}
                      refresh={handleRefresh}
                    />
                  )}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default DocumentsTable;
