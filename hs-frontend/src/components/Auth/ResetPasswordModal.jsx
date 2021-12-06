import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordModal = props => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {/* <Button onClick={props.onOpen}>Open Modal</Button> */}

      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zresetuj hasło</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ResetPasswordForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Zamknij
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ResetPasswordModal;
