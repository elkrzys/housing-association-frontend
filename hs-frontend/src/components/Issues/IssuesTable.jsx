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
import CustomAlertDialog from '../CustomAlertDialog.jsx';
import { ToastSuccess, ToastWarning } from '../Toasts.js';
import { MODES } from '../../strings';
import { AuthContext } from '../../contexts';
import Issue from './Issue';
import AddIssueForm from './AddIssueForm';
import UpdateIssueForm from './UpdateIssueForm';
import { IssuesService, LocalsService } from '../../services';

const IssuesTable = () => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();
  const [issues, setIssues] = useState([]);
  const [locals, setLocals] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {
    onOpen: onAlertOpen,
    onClose: onAlertClose,
    isOpen: isAlertOpen,
  } = useDisclosure();
  const cancelRef = useRef();

  const cancelIssue = async () => {
    setRefresh(true);
    await IssuesService.cancelIssue(selectedIssue.id);
    await getIssues();
    setRefresh(false);
    ToastSuccess(toast, 'Pomyślnie wycofano zgłoszenie');
  };

  const getIssues = async () => {
    let issuesResponse;
    if (role === 'resident') {
      issuesResponse = await IssuesService.getAllByAuthorId(user.id);
    } else {
      issuesResponse = await IssuesService.getAllNotCancelled();
    }

    if (issuesResponse.status === 'SUCCESS') {
      setIssues(issuesResponse.data);
    } else {
      console.log('failure during fetching issues');
      return null;
    }
  };

  const getLocals = async () => {
    const localsResponse = await LocalsService.getAllByResidentId(user.id);
    if (localsResponse.status === 'SUCCESS') {
      setLocals(localsResponse.data);
    } else {
      console.log('failure during fetching locals');
      return null;
    }
  };

  useEffect(() => {
    getIssues();
    getLocals();
    console.log(issues);
  }, [refresh]);

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

  const {
    isOpen: isDisplayOpen,
    onOpen: onDisplayOpen,
    onClose: onDisplayClose,
  } = useDisclosure();

  const closeAdd = () => {
    onAddClose();
    getIssues();
  };

  const closeUpdate = async () => {
    onEditClose();
    setRefresh(true);
    await getIssues();
    setRefresh(false);
  };

  const defColumns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Adres', accessor: 'address' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Data', accessor: 'created' },
    { Header: 'Stan', accessor: 'resolved' },
    { Header: 'Autor', accessor: 'author' },
  ];

  let columns = [];
  if (role === 'Resident')
    columns = defColumns.filter(column => column.accessor !== 'author');
  else {
    columns = defColumns;
  }

  const [selectedIssue, setSelectedIssue] = useState(null);

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
                isOpen={isDisplayOpen}>
                <Issue
                  title={selectedIssue?.title}
                  content={selectedIssue?.content}
                  author={selectedIssue?.author}
                  date={selectedIssue?.created}
                  isResolved={selectedIssue?.resolved}
                />
              </CustomModal>
              <Td w="5%">{issue.id}</Td>
              <Td w="20%">{`${issue.address?.city} ${issue.address?.street} ${issue.sourceBuildingId}/${issue.sourceLocalId}`}</Td>
              <Td w="20%">{issue.title}</Td>
              <Td>{new Date(issue.created).toLocaleDateString()}</Td>
              <Td>
                {issue.resolved !== null
                  ? `Zamknięte: ${issue.resolved}`
                  : 'W trakcie'}
              </Td>
              {role !== 'Resident' && (
                <Td w="20%">{`${issue.author.firstName} ${issue.author.lastName}`}</Td>
              )}
              <Td>
                <Flex justifyContent="center" gridColumnGap="1">
                  <Button
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}
                    onClick={e => {
                      setSelectedIssue(issue);
                      onEditOpen();
                      e.stopPropagation();
                    }}>
                    <FaEdit />
                    <CustomModal
                      header="Edytuj zgłoszenie"
                      size="lg"
                      onClose={onEditClose}
                      isOpen={isEditOpen}>
                      <UpdateIssueForm
                        onEditClose={closeUpdate}
                        locals={locals}
                        issue={selectedIssue}
                      />
                    </CustomModal>
                  </Button>
                  <Button
                    bg="red.100"
                    _hover={{ bg: 'red.200' }}
                    onClick={e => {
                      setSelectedIssue(issue);
                      onAlertOpen();
                      e.stopPropagation();
                    }}>
                    <FaBan />
                    <CustomAlertDialog
                      leastDestructiveRef={cancelRef}
                      onClose={onAlertClose}
                      isOpen={isAlertOpen}
                      onAction={cancelIssue}
                      actionName={'Wycofaj'}
                      header={'Wycofać zgłoszenie?'}>
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
export default IssuesTable;
