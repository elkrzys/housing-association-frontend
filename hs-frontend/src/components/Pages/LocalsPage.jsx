import MainLayout from './MainLayout';
import { LocalsTable } from '../Buildings';

const LocalsPage = () => {
  return (
    <MainLayout header="Twoje lokale">
      <LocalsTable />
    </MainLayout>
  );
};
export default LocalsPage;
