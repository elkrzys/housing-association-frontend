import React, { useRef, useContext } from 'react';
import { Flex, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import CustomModal from '../CustomModal';
import CustomAlertDialog from '../CustomAlertDialog';
import { LocalsService } from '../../services';
import { ToastError } from '../Toasts';
import EditLocalForm from './EditLocalForm';
import { AuthContext } from '../../contexts';

const EditLocalsCellBody = ({ selectedLocal, refresh }) => {
  const { user, role } = useContext(AuthContext);
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

  const deleteLocal = async localId => {
    let response;
    if (role !== 'Resident') {
      response = await LocalsService.deleteLocal(localId);
    } else {
      response = await LocalsService.deleteLocalByResident(localId, user.id);
    }
    if (response.status !== 'SUCCESS') {
      ToastError(toast, 'Usuwanie nieudane');
    }
    refresh();
  };

  return (
    <Flex maxH="24px" gridColumnGap="10px" justifyContent="center">
      {role !== 'Resident' && (
        <Button
          alignSelf="center"
          bg="blue.100"
          _hover={{ bg: 'blue.200' }}
          onClick={() => {
            onEditOpen();
          }}>
          <FaEdit />
          <CustomModal
            header="Edytuj lokal"
            size="md"
            onClose={() => {
              onEditClose();
              refresh();
            }}
            isOpen={isEditOpen}>
            <EditLocalForm local={selectedLocal} />
          </CustomModal>
        </Button>
      )}
      <Button
        alignSelf="center"
        bg="red.100"
        _hover={{ bg: 'red.200' }}
        onClick={onAlertOpen}>
        <FaTrash />
        <CustomAlertDialog
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
          isOpen={isAlertOpen}
          onAction={async () => await deleteLocal(selectedLocal.id)}
          actionName={'Usuń'}
          header={'Usunąć lokal?'}>
          <p>Tej operacji nie da się cofnąć.</p>
        </CustomAlertDialog>
      </Button>
    </Flex>
  );
};
export default EditLocalsCellBody;
