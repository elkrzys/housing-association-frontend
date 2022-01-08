import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const CustomAlertDialog = ({
  isOpen,
  cancelRef,
  onClose,
  onAction,
  header,
  actionName,
  children,
}) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isCentered>
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {header}
        </AlertDialogHeader>

        <AlertDialogBody>{children}</AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Anuluj
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              onAction();
              onClose();
            }}
            ml={3}>
            {actionName}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);
export default CustomAlertDialog;
