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
import { ModeContext } from '../../contexts';
import CustomModal from '../CustomModal.jsx';
import { MODES } from '../../strings';
import Announcement from './Announcement';
import AddAnnouncementForm from './AddAnnouncementForm';
import { AuthContext } from '../../contexts';

const AnnouncementsTable = () => {
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

  //   const announcement = {
  //     id: null,
  //     title: null,
  //     content: null,
  //     isCancelledOrExpired: false,
  //     date: null,
  //     authorId: null,
  //     targetBuildingsIds: null,
  //   };

  // map to:

  //   const announcement = {
  //     id: null,
  //     title: null,
  //     content: null,
  //     isCancelledOrExpired: false,
  //     date: null,
  //     author: { id: null, firstName: null, lastName: null },
  //     targetBuildingsIds: null,
  //   };

  const columns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Data', accessor: 'null' },
    { Header: 'Stan', accessor: 'isCancelledOrExpired' },
    { Header: 'Autor', accessor: 'author' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Remont',
      content:
        'W najbliższym tygodniu będzie miał miejsce remont klatki schodowej przy ulicy Reymonta 1, 2, 3, 4 i 5. Prosimy o ostrożność podczas trwania remontu i uważanie na narzędzia robotników',
      isCancelledOrExpired: false,
      date: '2021-12-06',
      author: { id: 1, firstName: 'Marek', lastName: 'Towarek' },
      targetBuildingsIds: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      title: 'Koszenie trawy',
      content:
        'W dniu 10.09.2021r. będzie miało miejsce koszenie trawy. Uprzejmie prosimy o przeparkowanie samochodów na odległość ok. 1m od trawników.',
      isCancelledOrExpired: true,
      date: '2021-09-06',
      author: { id: 1, firstName: 'Marek', lastName: 'Towarek' },
      targetBuildingsIds: [1, 2, 3, 4, 5],
    },
    {
      id: 3,
      title: 'Wymiana gazomierzy',
      content:
        'Informujemy, że firma XYZ będzie przeprowadzała wymianę gazomierzy we wszystkich mieszkaniach na ulicy Reymonta. Dotyczy to klatek schodowych od 1 do 5.',
      isCancelledOrExpired: true,
      date: '2021-09-03',
      author: { id: 2, firstName: 'Jerzy', lastName: 'Tramwaj' },
      targetBuildingsIds: [1, 2, 3, 4, 5],
    },
  ];

  const [announcementToDisplay, setAnnouncement] = useState(null);

  return (
    <Box rounded="lg" mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th key={column.accessor} w="20%" borderRight={'2px dotted gray'}>
                {column.Header}
              </Th>
            ))}

            {role !== 'Resident' && (
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
                    <AddAnnouncementForm />
                  </CustomModal>
                </Flex>
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {announcements.map((announcement, i) => (
            <Tr
              key={i}
              onClick={() => {
                setAnnouncement(announcement);
                onDisplayOpen();
              }}
              _hover={{
                boxShadow: '0px 0px 4px 0px rgba(66, 68, 90, 0.52);',
                transition: '0.1s',
                cursor: 'pointer',
              }}>
              <CustomModal onClose={onDisplayClose} isOpen={isDisplayOpen}>
                <Announcement
                  title={announcementToDisplay?.title}
                  content={announcementToDisplay?.content}
                  author={announcementToDisplay?.author}
                  date={announcementToDisplay?.date}
                />
              </CustomModal>
              <Td w="20%">{announcement.id}</Td>
              <Td w="20%">{announcement.title}</Td>
              <Td w="20%">{announcement.date}</Td>
              <Td w="20%">
                {announcement.isCancelledOrExpired ? 'Nieaktualne' : 'Aktualne'}
              </Td>
              <Td w="20%">{`${announcement.author.firstName} ${announcement.author.lastName}`}</Td>

              {role !== 'Resident' && (
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
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default AnnouncementsTable;
