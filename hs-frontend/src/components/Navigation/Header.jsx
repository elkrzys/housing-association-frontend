import { useContext } from 'react';
import { ModeContext } from '../../contexts';
import { Flex, Box, IconButton, Center, Text } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

const Header = ({ header, onShowSidebar, showSidebarButton = true }) => {
  const { mode } = useContext(ModeContext);

  return (
    <Flex bg="blue.500" p="4" color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            background="none"
            mt="5"
            _hover={{ background: 'none' }}
            icon={<FaBars />}
            onClick={onShowSidebar}
            variant="outline"
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">{mode !== null ? mode : header}</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
};

export default Header;
