import React, { useRef, useContext } from 'react';
import { Flex, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import CustomModal from '../CustomModal';
import CustomAlertDialog from '../CustomAlertDialog';
import { AnnouncementsService } from '../../services';
import { ToastError } from '../Toasts';
import UpdateAnnouncementForm from './UpdateAnnouncementForm';

const EditAnnouncementsCellBody = ({ announcement, refresh }) => {
  const cancelRef = useRef();
  const toast = useToast();

  const {
    onOpen: onAlertOpen,
    onClose: onAlertClose,
    isOpen: isAlertOpen,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const closeAndRefresh = async closeAction => {
    await refresh();
    closeAction();
  };
  const handleOpenWithNoPropagation = (e, openAction) => {
    openAction();
    e.stopPropagation();
  };

  const cancelAnnouncement = async () => {
    const response = await AnnouncementsService.cancelAnnouncement(
      announcement.id,
    );
    if (response.status !== 'SUCCESS') {
      ToastError(toast, 'Usuwanie nieudane');
    }
  };

  return (
    <Flex maxH="24px" gridColumnGap="10px" justifyContent="center">
      <Button
        alignSelf="center"
        bg="blue.100"
        _hover={{ bg: 'blue.200' }}
        onClick={e => handleOpenWithNoPropagation(e, onEditOpen)}>
        <FaEdit />
        <CustomModal
          header="Edytuj ogłoszenie"
          size="lg"
          onClose={onEditClose}
          isOpen={isEditOpen}>
          <UpdateAnnouncementForm
            announcement={announcement}
            onEditClose={() => closeAndRefresh(onEditClose)}
          />
        </CustomModal>
      </Button>
      <Button
        alignSelf="center"
        bg="red.100"
        _hover={{ bg: 'red.200' }}
        onClick={e => handleOpenWithNoPropagation(e, onAlertOpen)}>
        <FaTrash />
        <CustomAlertDialog
          leastDestructiveRef={cancelRef}
          onClose={() => closeAndRefresh(onAlertClose)}
          isOpen={isAlertOpen}
          onAction={async () => await cancelAnnouncement()}
          actionName={'Wycofaj'}
          header={'Wycofać ogłoszenie?'}>
          <p>Tej operacji nie da się cofnąć.</p>
        </CustomAlertDialog>
      </Button>
    </Flex>
  );
};
export default EditAnnouncementsCellBody;
