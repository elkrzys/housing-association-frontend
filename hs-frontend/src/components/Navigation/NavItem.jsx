import React from 'react';
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react';

const NavItem = ({ icon, title, active, navSize, onClick }) => {
  return (
    <Flex mt="1" flexDir="column" w="100%" alignItems="flex-start">
      <Menu placement="right">
        <Link
          backgroundColor={active && '#effbfc'}
          p="2"
          borderRadius="8"
          color="gray.800"
          _hover={{
            textDecor: 'none',
            backgroundColor: '#7ec1ff',
            color: 'white',
          }}
          w="100%"
          onClick={onClick}>
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize={{ base: 'sm', md: 'md' }}
                color="blue.500"
              />
              <Text ml="3" align="left" fontSize={{ base: 'sm', md: 'sm' }}>
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
