import MainLayout from './MainLayout';
import { BuildingsTable } from '../Buildings';

const BuildingsPage = () => {
  return (
    <MainLayout header="Budynki wspólnoty">
      <BuildingsTable />
    </MainLayout>
  );
};
export default BuildingsPage;
