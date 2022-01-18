import MainLayout from './MainLayout';
import { DocumentsView } from '../Documents';

const DocumentsPage = () => {
  return (
    <MainLayout header="Dokumenty">
      <DocumentsView />
    </MainLayout>
  );
};
export default DocumentsPage;
