import React from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';

const NavItem = ({ icon, title, active, navSize, onClick }) => {
  return (
    <Flex mt={1} flexDir="column" w="100%" alignItems={'flex-start'}>
      <Menu placement="right">
        <Link
          backgroundColor={active && '#effbfc'}
          p={2}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: '#73EFFF' }}
          w={'100%'}
          onClick={onClick}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? '#73EFFF' : 'gray.500'}
              />
              <Text ml={3} display={navSize === 'small' ? 'none' : 'flex'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};
export default NavItem;
