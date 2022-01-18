import { useParams } from 'react-router-dom';
import MainLayout from './MainLayout';
import { BuildingDetails } from '../Buildings';

const BuildingDetailsPage = () => {
  const { buildingId } = useParams();
  return (
    <MainLayout header="Szczegóły budynku">
      <BuildingDetails buildingId={buildingId} />
    </MainLayout>
  );
};
export default BuildingDetailsPage;
