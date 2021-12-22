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

const CustomModal = ({
  isOpen,
  onClose,
  header,
  size,
  children,
  footerContent,
}) => {
  return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="5">{children}</ModalBody>
          {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
};
export default CustomModal;
