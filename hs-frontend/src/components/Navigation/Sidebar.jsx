import React, { useContext } from 'react';
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import { AuthContext } from '../../contexts';

const Sidebar = ({ isOpen, variant, onClose }) => {
  const { role } = useContext(AuthContext);
  // const sidebarContent =
  //   role === 'Worker' ? (
  //     <WorkerSidebarContent onClick={onClose} />
  //   ) : (
  //     <ResidentSidebarContent onClick={onClose} />
  //   );

  return variant === 'sidebar' ? (
    <Box position="fixed" left={0} p={5} w="16vw" top={0} h="100%" bg="#f2f2f2">
      <SidebarContent />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Chakra-UI</DrawerHeader> */}
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
export default Sidebar;
