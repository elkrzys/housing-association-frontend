import { useContext } from 'react';
import { Box, Stack, Text, Button, List, ListItem } from '@chakra-ui/react';
import { AuthContext } from '../../contexts';
const UserInfo = ({ selectedUser }) => {
  const { user } = useContext(AuthContext);
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

        <List spacing={2}>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Imię i nazwisko:
            </Text>{' '}
            {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Adres email:
            </Text>{' '}
            {selectedUser?.email}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Numer telefonu:
            </Text>{' '}
            {selectedUser?.phoneNumber}
          </ListItem>
        </List>
      </Box>

      <Button
        rounded="md"
        w="full"
        mt="2"
        size="sm"
        py="6"
        bg="blue.300"
        color="white"
        textTransform={'uppercase'}
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'lg',
        }}>
        Wyślij dokument
      </Button>
      {selectedUser?.role === 'Resident'}
      <Button
        rounded="md"
        w="full"
        mt="2"
        size="sm"
        py="6"
        bg="red.300"
        color="white"
        textTransform={'uppercase'}
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'lg',
        }}>
        Zablokuj
      </Button>
    </Stack>
  );
};
export default UserInfo;
