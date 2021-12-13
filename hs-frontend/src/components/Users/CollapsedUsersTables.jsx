import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import UsersTable from './UsersTable';

const CollapsedUsersTables = () => {
  return (
    <Flex w="full">
      <Accordion allowMultiple w="100%">
        <AccordionItem>
          <h2>
            <AccordionButton w="100%">
              <Box flex="1" textAlign="center">
                Mieszkańcy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} w="100%">
            <UsersTable usersRole="residents" />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                Pracownicy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <UsersTable usersRole="workers" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
export default CollapsedUsersTables;
