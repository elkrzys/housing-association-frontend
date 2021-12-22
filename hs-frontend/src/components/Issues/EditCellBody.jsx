import React, { useRef } from 'react';
import {
  Box,
  Flex,
  Td,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaBan, FaEdit } from 'react-icons/fa';
import CustomModal from '../CustomModal.jsx';
import CustomAlertDialog from '../CustomAlertDialog.jsx';
import { ToastSuccess, ToastWarning } from '../Toasts.js';
import UpdateIssueForm from './UpdateIssueForm';
import { IssuesService } from '../../services';

const EditCellBody = ({ selectedIssue, locals, refresh }) => {
  const {
    onOpen: onAlertOpen,
    onClose: onAlertClose,
    isOpen: isAlertOpen,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const cancelIssue = async () => {
    const response = await IssuesService.cancelIssue(selectedIssue.id);
    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Pomyślnie wycofano zgłoszenie');
      refresh();
    } else {
      ToastSuccess(toast, 'Nie można było wycofać zgłoszenia');
    }
  };

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const closeUpdate = async () => {
    onEditClose();
    refresh();
  };

  return (
    <Flex justifyContent="center" gridColumnGap="1">
      <Button
        bg="blue.100"
        _hover={{ bg: 'blue.200' }}
        onClick={e => {
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
  );
};
export default EditCellBody;
