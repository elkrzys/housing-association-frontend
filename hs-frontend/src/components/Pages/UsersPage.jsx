import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import {
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import MainLayout from './MainLayout';
import UsersTable from '../Users/UsersTable';

const UsersPage = () => {
  return (
    <MainLayout header="Użytkownicy">
      <Box w="100%">
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
      </Box>
    </MainLayout>
  );
};
export default UsersPage;
