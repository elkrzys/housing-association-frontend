import { Flex, Stack } from '@chakra-ui/react';
import UpdateBuildingForm from './UpdateBuildingForm';
import LocalsTable from './LocalsTable';

const BuildingDetails = ({ buildingId }) => {
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
