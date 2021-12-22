import { useContext } from 'react';
import {
  Flex,
  Box,
  HStack,
  Heading,
  Text,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { AuthContext } from '../../contexts';
import { UsersService } from '../../services';

const Issue = ({ title, content, author, date, resolved }) => {
  const { role } = useContext(AuthContext);
  const color = resolved ? 'green' : 'orange';
  const message = resolved
    ? `Zgłoszenie zamknięte ${new Date(resolved).toLocaleDateString()}`
    : 'Zgłoszenie w trakcie';
  return (
    <Box pb="5">
      <Heading textAlign="center" fontSize="1.5rem" p="10">
        {title}
      </Heading>
      <Divider w="75%" mx="auto" />
      <Text px="4" py="6" textAlign="justify">
        {content}
      </Text>
      <Divider w="75%" mx="auto" />
      <HStack px="2" py="4" justifyContent="end" direction="column">
        <Box fontWeight="100" color={color}>
          {message}
        </Box>
        {role !== 'Resident' && (
          <Box fontWeight="600">{`${author.firstName} ${author.lastName}`}</Box>
        )}
        <Box fontWeight="100">{new Date(date).toLocaleString()}</Box>
      </HStack>
    </Box>
  );
};
export default Issue;
