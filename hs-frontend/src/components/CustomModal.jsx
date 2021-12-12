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

const CustomModal = ({ isOpen, onClose, header, children }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Zamknij
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
export default CustomModal;
