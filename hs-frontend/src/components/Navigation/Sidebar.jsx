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

const Sidebar = ({ isOpen, variant, onClose }) =>
  variant === 'sidebar' ? (
    <Box position="fixed" left={0} p={5} w="16vw" top={0} h="100%" bg="#f2f2f2">
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Chakra-UI</DrawerHeader> */}
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
export default Sidebar;
