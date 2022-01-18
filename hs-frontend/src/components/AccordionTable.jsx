import React from 'react';
import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const AccordionTable = ({ header, children }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton w="100%">
          <Box flex="1" textAlign="center">
            {header}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} w="100%">
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
};
export default AccordionTable;
