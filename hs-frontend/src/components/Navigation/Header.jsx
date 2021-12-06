import { Flex, Box, IconButton, Center, Text } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

const Header = ({ showSidebarButton = true, onShowSidebar }) => {
  return (
    <Flex bg="blue.500" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: 'none' }}
            icon={<FaBars />}
            onClick={onShowSidebar}
            variant="outline"
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">Homepage Demo</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
};

export default Header;
