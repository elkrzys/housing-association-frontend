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
import { FaArrowDown, FaArrowUp, FaBan, FaEdit } from 'react-icons/fa';
import React, { useContext, useEffect, useState } from 'react';
import CustomModal from '../CustomModal.jsx';
import { MODES } from '../../strings';
import { AuthContext } from '../../contexts';
import Issue from './Issue';
import AddIssueForm from './AddIssueForm';

const IssuesTable = () => {
  const { user, role } = useContext(AuthContext);

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

  const defColumns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Data', accessor: 'date' },
    { Header: 'Stan', accessor: 'isResolved' },
    { Header: 'Autor', accessor: 'author' },
  ];

  let columns = [];
  if (role === 'Resident')
    columns = defColumns.filter(column => column.accessor !== 'author');
  else {
    columns = defColumns;
  }

  const issues = [
    {
      id: 1,
      title: 'Spalona żarówka',
      content: 'Na trzecim piętrze spaliła się żarówka.',
      isResolved: true,
      date: '2021-12-06',
      author: { id: 1, firstName: 'Tomek', lastName: 'Atomek' },
      targetBuildingsIds: [1],
    },
    // {
    //   id: 2,
    //   title: 'Uszkodzone drzwi',
    //   content:
    //     'W klatce nr 20 drzwi się nie domykają. Dodatkowo występuje problem przy otwieraniu domofonem.',
    //   isResolved: false,
    //   date: '2021-12-06',
    //   author: { id: 2, firstName: 'Kamil', lastName: 'Nowak' },
    //   targetBuildingsIds: [2],
    // },
  ];

  const [displayIssue, setDisplayIssue] = useState(null);

  return (
    <Box rounded="lg" mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th
                key={column.accessor}
                w="20%"
                borderRight={'2px dotted gray'}
                colSpan={column.accessor === 'author' ? '2' : '0'}>
                {column.Header}
              </Th>
            ))}

            {role === 'Resident' && (
              <Th>
                <Flex justifyContent="center">
                  <Button
                    bg="gray.100"
                    _hover={{ bg: 'white' }}
                    onClick={onAddOpen}>
                    Dodaj
                  </Button>
                  <CustomModal
                    isOpen={isAddOpen}
                    onClose={onAddClose}
                    header={'Dodaj ogłoszenie'}>
                    <AddIssueForm />
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
                setDisplayIssue(issue);
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
                  title={displayIssue?.title}
                  content={displayIssue?.content}
                  author={displayIssue?.author}
                  date={displayIssue?.date}
                  isResolved={displayIssue?.isResolved}
                />
              </CustomModal>
              <Td w="20%">{issue.id}</Td>
              <Td w="20%">{issue.title}</Td>
              <Td w="20%">{issue.date}</Td>
              <Td w="20%">{issue.isResolved ? 'Zamknięte' : 'W trakcie'}</Td>
              {role !== 'Resident' && (
                <Td w="20%">{`${issue.author.firstName} ${issue.author.lastName}`}</Td>
              )}
              <Td>
                <Flex justifyContent="center">
                  <Button
                    bg="blue.100"
                    _hover={{ bg: 'blue.200' }}
                    onClick={e => {
                      e.stopPropagation();
                      //   setMode({
                      //     mode: MODES.EditAnnouncement,
                      //     contentId: announcement.id,
                      //   });
                    }}>
                    <FaEdit />
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
