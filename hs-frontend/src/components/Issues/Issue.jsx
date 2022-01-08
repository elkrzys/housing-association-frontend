import { useContext } from 'react';
import { Box, HStack, Heading, Text, Divider } from '@chakra-ui/react';
import { AuthContext } from '../../contexts';

const Issue = ({ title, content, author, date, resolved }) => {
  const getFormattedDate = () => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDay();
    const hours = dt.getHours();
    const minutes = dt.getMinutes();

    return `${day < 10 ? '0' : ''}${day}.${
      month < 10 ? '0' : ''
    }${month}.${year}, ${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  };

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
      <Text whiteSpace="pre-wrap" px="4" py="6" textAlign="justify">
        {content}
      </Text>
      <Divider w="75%" mx="auto" />
      <HStack px="2" py="4" justifyContent="space-between" direction="column">
        <Box fontWeight="100" color={color}>
          {message}
        </Box>
        {role !== 'Resident' && 'Autor:' && (
          <Box fontWeight="600">
            <Text>Autor:</Text>
            <Text fontStyle="italic">{`${author.firstName} ${author.lastName}`}</Text>
          </Box>
        )}
        <Box fontWeight="100">{getFormattedDate()}</Box>
      </HStack>
    </Box>
  );
};
export default Issue;
