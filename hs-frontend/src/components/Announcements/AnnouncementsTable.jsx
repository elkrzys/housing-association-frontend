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
import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from '../../contexts';
import CustomModal from '../CustomModal.jsx';
import { MODES } from '../../strings';
import Announcement from './Announcement';
import AddAnnouncementForm from './AddAnnouncementForm';
import { AuthContext } from '../../contexts';
import { AnnouncementsService } from '../../services';
import { ToastError, ToastSuccess } from '../Toasts';
import EditAnnouncementsCellBody from './EditAnnouncementsCellBody';

const AnnouncementsTable = () => {
  const { user, role } = useContext(AuthContext);
  const toast = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getAnnouncements = async () => {
    let response;
    if (role !== 'Resident') {
      response = await AnnouncementsService.getAllNotCancelled();
    } else {
      response = await AnnouncementsService.getAllByReceiverId(user.id);
    }
    if (response.status === 'SUCCESS') {
      setAnnouncements(response.data);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania ogłoszeń');
    }
  };

  const handleRefresh = async () => {
    await getAnnouncements();
    setRefresh(!refresh);
  };

  const closeAndRefresh = closeAction => {
    closeAction();
    handleRefresh();
  };

  useEffect(() => {
    getAnnouncements();
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

  const columns = [
    { Header: 'Nr.', accessor: 'id' },
    { Header: 'Tytuł', accessor: 'title' },
    { Header: 'Utworzono', accessor: 'created' },
    { Header: 'Wygasa', accessor: 'expirationDate' },
    { Header: 'Autor', accessor: 'author' },
  ];

  return (
    <Box rounded="lg" mx={{ base: '0', md: '5%' }}>
      <Table variant="striped" colorScheme="gray">
        <Thead h="75px">
          <Tr bg="blue.100">
            {columns.map(column => (
              <Th key={column.accessor}>{column.Header}</Th>
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
                    size="lg"
                    header="Dodaj ogłoszenie">
                    <AddAnnouncementForm
                      onAddClose={() => closeAndRefresh(onAddClose)}
                    />
                  </CustomModal>
                </Flex>
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {announcements.map(announcement => (
            <Tr
              key={announcement.id}
              onClick={() => {
                setSelectedAnnouncement(announcement);
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
                isOpen={
                  isDisplayOpen && announcement.id === selectedAnnouncement?.id
                }>
                <Announcement
                  title={selectedAnnouncement?.title}
                  content={selectedAnnouncement?.content}
                  author={selectedAnnouncement?.author}
                  date={selectedAnnouncement?.date}
                />
              </CustomModal>
              <Td w="5%">{announcement.id}</Td>
              <Td w="20%">{announcement.title}</Td>
              <Td w="20%">
                {new Date(announcement.created).toLocaleDateString()}
              </Td>
              <Td w="20%">
                {new Date(announcement.expirationDate).toLocaleDateString()}
              </Td>
              <Td w="20%">{`${announcement.author.firstName} ${announcement.author.lastName}`}</Td>
              {role !== 'Resident' && (
                <Td>
                  <EditAnnouncementsCellBody
                    announcement={announcement}
                    refresh={() => handleRefresh()}
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
export default AnnouncementsTable;
