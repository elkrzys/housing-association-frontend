import React, { useState, useEffect, useContext } from 'react';
import { Flex, Accordion } from '@chakra-ui/react';
import OwnedDocumentsTable from './OwnedDocumentsTable';
import ReceivedDocumentsTable from './ReceivedDocumentsTable';
import AccordionTable from '../AccordionTable';
import { AuthContext } from '../../contexts';

const DocumentsView = () => {
  const { role } = useContext(AuthContext);
  return (
    <Flex w="full">
      <Accordion allowMultiple w="100%">
        <AccordionTable header="Wysłane dokumenty">
          <OwnedDocumentsTable />
        </AccordionTable>
        <AccordionTable
          header={
            role === 'Resident'
              ? 'Otrzymane dokumenty'
              : 'Dokumenty od mieszkańców'
          }>
          <ReceivedDocumentsTable />
        </AccordionTable>
      </Accordion>
    </Flex>
  );
};
export default DocumentsView;
