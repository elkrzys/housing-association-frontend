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
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {/* <Button onClick={props.onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zmień hasło</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangePasswordForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Zamknij
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
