import { useState, useContext, useEffect } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts';

const MainLayout = ({ header, children }) => {
  const { token } = useContext(AuthContext);
  const smVariant = { navigation: 'drawer', navigationButton: true };
  const mdVariant = { navigation: 'sidebar', navigationButton: false };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return token === null ? (
    <Redirect to="/login" />
  ) : (
    <Flex w="100%">
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Box
        ml={!variants?.navigationButton && { base: '0', md: '16vw' }}
        w={!variants?.navigationButton && { base: '100vw', md: '84vw' }}>
        <Header
          header={header}
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
        <Box minW="100%" justify="center" mt="4vh">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
export default MainLayout;
