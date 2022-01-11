import MainLayout from './MainLayout';
import { IssuesTable } from '../Issues';

const IssuesPage = () => {
  return (
    <MainLayout header="Zgłoszenia">
      <IssuesTable />
    </MainLayout>
  );
};
export default IssuesPage;
