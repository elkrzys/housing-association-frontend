import {
  Flex,
  Box,
  HStack,
  Heading,
  Text,
  Divider,
  Stack,
} from '@chakra-ui/react';

const Announcement = ({ title, content, author, date }) => {
  return (
    <Box>
      <Heading textAlign="center" fontSize="1.5rem" p="10">
        {title}
      </Heading>
      <Divider w="75%" mx="auto" />
      <Text px="4" py="6">
        {content}
      </Text>
      <Divider w="75%" mx="auto" />
      <HStack px="2" py="4" justifyContent="end" direction="column">
        <Box fontWeight="600">{`${author.firstName} ${author.lastName}`}</Box>
        <Box fontWeight="100">{date}</Box>
      </HStack>
    </Box>
  );
};
export default Announcement;
