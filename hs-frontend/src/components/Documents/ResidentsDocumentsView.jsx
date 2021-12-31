import React, { useState, useEffect } from 'react';
import { Flex, Accordion } from '@chakra-ui/react';
import OwnedDocumentsTable from './OwnedDocumentsTable';
import ReceivedDocumentsTable from './ReceivedDocumentsTable';
import AccordionTable from '../AccordionTable';

const ResidentDocumentsView = () => {
  return (
    <Flex w="full">
      <Accordion allowMultiple w="100%">
        <AccordionTable header="Własne dokumenty">
          <OwnedDocumentsTable />
        </AccordionTable>
        <AccordionTable header="Otrzymane dokumenty">
          <ReceivedDocumentsTable />
        </AccordionTable>
      </Accordion>
    </Flex>
  );
};
export default ResidentDocumentsView;
