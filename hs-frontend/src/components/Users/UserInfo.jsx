import { useContext, useRef } from 'react';
import {
  Box,
  Stack,
  Text,
  Button,
  List,
  ListItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AuthContext, ModeContext } from '../../contexts';
import CustomModal from '../CustomModal';
import CustomAlertDialog from '../CustomAlertDialog';
import { AddDocumentForm } from '../Documents';
import { UsersService } from '../../services';
import { MODES } from '../../strings';

const UserInfo = ({ selectedUser }) => {
  const { user } = useContext(AuthContext);
  const { setMode } = useContext(ModeContext);
  const cancelRef = useRef();
  const toast = useToast();

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isBanOpen,
    onOpen: onBanOpen,
    onClose: onBanClose,
  } = useDisclosure();

  const handleUserBan = async () => {
    const response = await UsersService.banUser(selectedUser.id);
    if (response.status === 'SUCCESS') {
      ToastSuccess(toast, 'Użytownik trwale zablokowany');
      setMode({
        mode: MODES,
        contentId: null,
      });
    }
  };

  return (
    <Stack spacing={{ base: 4, md: 2 }}>
      <Box>
        <Text
          fontSize={{ base: '16px', lg: '18px' }}
          color="green.600"
          fontWeight={'500'}
          textTransform={'uppercase'}
          mb={'4'}>
          {'Dane '}
          {selectedUser?.role === 'Resident' ? 'mieszkańca' : 'pracownika'}
          {selectedUser.id === user.id && ' (Moje dane)'}
        </Text>
        <List spacing="2">
          <ListItem>
            <Text as="span" fontWeight="bold">
              Imię i nazwisko:
            </Text>{' '}
            {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Adres email:
            </Text>{' '}
            {selectedUser?.email}
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Numer telefonu:
            </Text>{' '}
            {selectedUser?.phoneNumber}
          </ListItem>
        </List>
      </Box>
      {selectedUser?.id !== user.id && (
        <Button
          rounded="md"
          w="full"
          mt="2"
          size="sm"
          py="6"
          bg="blue.300"
          color="white"
          textTransform="uppercase"
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
          onClick={onAddOpen}>
          Wyślij dokument
          <CustomModal
            isOpen={isAddOpen}
            onClose={onAddClose}
            header={'Dodaj dokument'}>
            <AddDocumentForm
              preSelectedUserId={selectedUser.id}
              onClose={onAddClose}
            />
          </CustomModal>
        </Button>
      )}
      {selectedUser?.role === 'Resident' && selectedUser?.id !== user.id && (
        <Button
          rounded="md"
          w="full"
          mt="2"
          size="sm"
          py="6"
          bg="red.300"
          color="white"
          textTransform="uppercase"
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
          onClick={onBanOpen}>
          Zablokuj
          <CustomAlertDialog
            isOpen={isBanOpen}
            onClose={onBanClose}
            cancelRef={cancelRef}
            onAction={async () => handleUserBan()}
            actionName="Zablokuj"
            header="Zablokuj użytkownika">
            Na pewno zablokować użytkownika? Jest to operacja, której nie można
            cofnąć.
          </CustomAlertDialog>
        </Button>
      )}
    </Stack>
  );
};
export default UserInfo;
