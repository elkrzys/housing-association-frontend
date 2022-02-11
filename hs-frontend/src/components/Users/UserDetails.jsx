import { useEffect, useState } from 'react';
import { Flex, Stack, useToast } from '@chakra-ui/react';
import UserInfo from './UserInfo';
import { UsersService } from '../../services';
import { ToastError, ToastSuccess } from '../Toasts';
import { LocalsTable } from '../Buildings';
const UserDetails = ({ userId }) => {
  const [user, setUser] = useState();
  const [ready, setReady] = useState(false);
  const toast = useToast();

  const getUser = async () => {
    const response = await UsersService.getUser(userId);
    if (response.status === 'SUCCESS') {
      setUser(response.data);
      setReady(true);
    } else {
      ToastError(toast, 'Wystąpił problem podczas wczytywania użytkownika');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    ready && (
      <Flex justifyContent="center">
        <Stack
          spacing="25px"
          direction={['column', 'column', 'column', 'column', 'row']}>
          <UserInfo selectedUser={user} />
          {user?.role === 'Resident' && <LocalsTable residentId={user.id} />}
        </Stack>
      </Flex>
    )
  );
};
export default UserDetails;
