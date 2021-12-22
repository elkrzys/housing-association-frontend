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
import AddIssueForm from './AddIssueForm';
import { IssuesService, LocalsService } from '../../services';
import EditCellBody from './EditCellBody.jsx';

const IssuesTable = () => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();
  const [issues, setIssues] = useState([]);
  const [locals, setLocals] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = async () => {
    await getIssues();
    setRefresh(!refresh);
  };

  const resolveIssue = async () => {
    const response = await IssuesService.resolveIssue(selectedIssue.id);
    onDisplayClose();
    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Pomyślnie zatwierdzono zgłoszenie');
      handleRefresh();
    } else {
      ToastError(toast, 'Nie można było zatwierdzić zgłoszenia');
    }
  };

  const getIssues = async () => {
    let response;
    if (role === 'Resident') {
      response = await IssuesService.getAllByAuthorId(user.id);
    } else {
      response = await IssuesService.getAllNotCancelled();
    }

    if (response.status === 'SUCCESS') {
      setIssues(response.data);
    } else {
      console.log('failure during fetching issues');
      ToastError(toast, 'Wystąpił problem podczas wczytywania zgłoszeń');
    }
  };

  const getLocals = async () => {
    const localsResponse = await LocalsService.getAllByResidentId(user.id);
    if (localsResponse.status === 'SUCCESS') {
      setLocals(localsResponse.data);
    } else {
      console.log('failure during fetching locals');
      ToastError(toast, 'Wystąpił problem podczas wczytywania mieszkań');
    }
  };

  useEffect(() => {
    getIssues();
    getLocals();
  }, [refresh]);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isDisplayOpen,
    onOpen: onDisplayOpen,
    onClose: onDisplayClose,
  } = useDisclosure();

  const closeAdd = () => {
    onAddClose();
    handleRefresh();
  };

  const defColumns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Adres', accessor: 'address' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Utworzone', accessor: 'created' },
    { Header: 'Stan', accessor: 'resolved' },
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
                    <AddIssueForm locals={locals} onAddClose={closeAdd} />
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
                  selectedIssue?.isResolved && (
                    <Button
                      colorScheme="green"
                      onClick={async () =>
                        await resolveIssue(selectedIssue.id)
                      }>
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
export default IssuesTable;
