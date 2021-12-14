import { useState } from 'react';
import { Flex, Stack, Box, Button } from '@chakra-ui/react';
import UpdateBuildingForm from './UpdateBuildingForm';
import LocalsTable from './LocalsTable';

const BuildingDetails = ({ buildingId }) => {
  const [building, setBuilding] = useState(null);

  // UpdateBuildingForm + LocalsTable
  // todo: function to get building by id
  // also: get all buiding locals (add table for locals)

  return (
    <Flex bg="none" justifyContent="center">
      <Stack
        spacing={['25px', '25px', '25px', '25px', '10px']}
        direction={['column', 'column', 'column', 'column', 'row']}>
        <UpdateBuildingForm buildingId={buildingId} />
        <LocalsTable buildingId={buildingId} />
      </Stack>
    </Flex>
  );
};
export default BuildingDetails;